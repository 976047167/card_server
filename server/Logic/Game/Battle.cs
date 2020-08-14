using Utils;
using System;
using System.Collections;
using System.Collections.Generic;
namespace Logic
{

	class Battle
	{
		public BattlePlayer currentController { get; private set; }
		public readonly string id;
		public readonly Trigger trigger;
		public readonly GameActionManager actionManager;
		private Dictionary<string, BattlePlayer> players;
		private MersenneTwister random;
		private BattlePlayer _currentController;
		private Dictionary<int, BattleObject> bidMap; // 场景里所有物体都有对应的bid，用于检索所有对象
		private int _bid = 0;
		private IEnumerator<BattlePlayer> strikeGenerator;
		private BATTLE_STATE gamState;
		public Battle(int seed)
		{
			this.random = new MersenneTwister(seed);
			this.id = Guid.NewGuid().ToString();
			this.bidMap = new Dictionary<int, BattleObject>();
			this.trigger = new Trigger();
			this.actionManager = new GameActionManager(this);
		}
		public void setPlayers(IPlayerInfo[] playerInfos)
		{
			this.players = new Dictionary<string, BattlePlayer>();
			foreach (var e in playerInfos)
			{
				this.players.TryAdd(e.uid, new BattlePlayer(this, e));
			}
		}
		public void start()
		{
			Console.WriteLine("game start!", this.id);
			this.gamState = BATTLE_STATE.GAMING;
			foreach (BattlePlayer player in this.players.Values)
			{
				player.gameStart();
			}
			this.strikeGenerator = this.generatorStriker();
			this.newTurn();
		}
		/// <summary>
		/// 获取随机数，采用伪随机算法，确保还原日志。范围为[min,max)
		/// 是否为整数，如果为true的话,范围为[min,max]
		/// </summary>
		/// <param name="min">下限</param>
		/// <param name="max">上限</param>
		/// <returns></returns>
		public double getRandom(double min = 0, double max = 1)
		{
			double r = this.random.NextDouble();
			return min + (max - min) * r;
		}
		public int getRandom(int min = 0, int max = 1)
		{
			double r = this.random.NextDouble();
			return (int)(min + (max + 1 - min) * r);
		}

		/// <summary>
		/// 根据uid获取player对象
		/// </summary>
		/// <param name="uid"></param>
		/// <returns></returns>
		public BattlePlayer getPlayer(string uid)
		{
			return this.players[uid];
		}
		public int registerBOJ(BattleObject obj)
		{
			this.bidMap.TryAdd(++this._bid, obj);
			return this._bid;
		}
		public T getObjectByBId<T>(int bId) where T : BattleObject
		{
			BattleObject obj = null;
			this.bidMap.TryGetValue(bId, out obj);
			return (T)obj;
		}
		public void command(IUserCommand cmd)
		{
			switch (cmd.commandId)
			{
				case COMMAND_ID.USE_HAND_CARD:
					this.useHandCard(cmd);
					break;
				case COMMAND_ID.TURN_END:
					this.turnEnd(cmd);
					break;
				default:
					break;
			}
		}

		/**
		* 获取当前场上信息，重连时会用到
*/
		public void getSituation()
		{
			// 			const reslut = {
			// 			currentController: this.currentController.uid,
			// 			players:[],
			// 		}for (const p of this.players.values()) {
			// 	reslut.players.push({
			// 	uid: p.uid,
			// 				bid: p.bId,
			// 				info: p.getSituation(),
			// 			});
			// }
			// return reslut;
		}
		private void newTurn()
		{
			this.strikeGenerator.MoveNext();
			this._currentController = this.strikeGenerator.Current;
			this.currentController.turnBegin();
			// push
		}
		private void turnEnd(IUserCommand cmd)
		{
			BattlePlayer player = this.getPlayer(cmd.uid);
			if (player != this.currentController) { return; }
			this.currentController.turnEnd();
			this.newTurn();
		}
		private void useHandCard(IUserCommand cmd)
		{
			args = cmd.args as IArgsUseHandCard;
			if (!args) { return; }
			BattlePlayer player = this.getPlayer(cmd.uid);
			if (player != this.currentController) { return; }
			player.useHandCard(args);
		}
		/// <summary>
		/// 计算先攻顺序队列
		/// </summary>
		/// <returns></returns>
		private IEnumerator<BattlePlayer> generatorStriker()
		{
			Stack<BattlePlayer> actPlayers = new Stack<BattlePlayer>();
			while (this.gamState == BATTLE_STATE.GAMING)
			{
				if (actPlayers.Count > 0)
				{
					yield return actPlayers.Pop();
					continue;
				}
				else
				{
					// 					actPlayers = Array.from(this.players.values());
					// 	actPlayers.((a, b) =>
					// 	{
					// //先攻相等比感知
					// return a.attribute.derive.initiative - b.attribute.derive.initiative ||
					// 				a.attribute.per - b.attribute.per;
					// 	});
				}

			}
		}
	}

}