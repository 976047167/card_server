using System.Collections;
using System.Collections.Generic;
namespace Logic
{
	struct IUserCommand
	{
		public string uid;
		public string battleId;
		public COMMAND_ID commandId;
		public object args;
	}
	class GameController
	{
		private static GameController _instance;
		private Dictionary<string, object> battleMap;
		public GameController()
		{
			this.battleMap = new Dictionary<string, object>();
		}
		public static GameController getInstance()
		{
			if (_instance == null) { _instance = new GameController(); }
			return _instance;
		}
		public object createBattle(float seed)
		{
			return 1;
		}
		public void setPlayer(string battleId, IPlayerInfo[] playerInfos)
		{

		}

		public void command(IUserCommand command)
		{

		}
		public void getSituation(string battleId)
		{

		}

		public object getBattle(string battleId)
		{
			return this.battleMap[battleId];
		}
	}

}