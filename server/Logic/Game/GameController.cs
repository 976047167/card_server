using System.Collections;
using System.Collections.Generic;
namespace Logic
{

	class GameController
	{
		private static GameController _instance;
		private Dictionary<string, Battle> battleMap;
		private GameController()
		{
			this.battleMap = new Dictionary<string, Battle>();
		}
		public static GameController getInstance()
		{
			if (_instance == null) { _instance = new GameController(); }
			return _instance;
		}
		public string createBattle(int seed)
		{
			Battle battle = new Battle(seed);
			this.battleMap.TryAdd(battle.id, battle);
			return battle.id;
		}
		public void startBattle(string battleId)
		{
			Battle b = this.getBattle(battleId);
			b.start();
		}
		public void setPlayer(string battleId, PlayerInfo[] playerInfos)
		{
			Battle b = this.getBattle(battleId);
			b.setPlayers(playerInfos);
			System.Console.WriteLine("Battle:{0} setPlayerInfos!", battleId);
		}

		public void command(UserCommand command)
		{
			Battle battle = this.getBattle(command.battleId);
			if (battle == null) { return; }
			BattlePlayer player = battle.getPlayer(command.uid);
			if (player == null) { return; }
			battle.command(command);
		}
		public void getSituation(string battleId)
		{

		}

		public Battle getBattle(string battleId)
		{
			Battle ret;
			this.battleMap.TryGetValue(battleId, out ret);
			return ret;
		}
	}

}