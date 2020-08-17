using System.Collections;
using System.Collections.Generic;
namespace Logic
{

	class GameController
	{
		private static GameController _instance;
		private Dictionary<string, object> battleMap;
		private GameController()
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
		public void setPlayer(string battleId, PlayerInfo[] playerInfos)
		{

		}

		public void command(UserCommand command)
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