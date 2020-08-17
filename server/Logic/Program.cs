using System;
namespace Logic
{
	class Program
	{
		private static string gid;
		private static GameController g;
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
					deal(answer[0],answer[1],answer[2]);
				}
			} while (line != null);
			Console.WriteLine("Have a nice day!");
		}
		static void deal(string id, string cmd, string arg)
		{

			Console.WriteLine(cmd);
			UserCommand a;
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