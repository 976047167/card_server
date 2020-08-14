using System;
namespace Logic
{
	class Program
	{
		private string gid;
		private GameController g;
		static void Main(string[] args)
		{
			string line;
			g = GameController.getInstance();
			Console.WriteLine("Enter one or more lines of text (press CTRL+Z to exit):\n");
			do
			{
				line = Console.ReadLine().Trim();
				if (line != null)
				{
					string[] answer = line.Split(" ");
				}
			} while (line != null);
			Console.WriteLine("Have a nice day!");
		}
		void deal(string id, string cmd, string arg)
		{

			Console.WriteLine(cmd);
			IUserCommand a;
			switch (cmd)
			{
				case "-a":
					a.uid = id;
					a.commandId = COMMAND_ID.USE_HAND_CARD;
					a.battleId = gid;
					a.args = null;
					g.command(a);
					break;
				case "-b":
					g.getSituation(gid);
					break;
				case "-c":
					a.uid = id;
					a.commandId = COMMAND_ID.TURN_END;
					a.battleId = gid;
					a.args = null;
					g.command(a);
					break;
			}
		}
	}
}