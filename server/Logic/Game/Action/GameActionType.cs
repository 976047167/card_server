using System;
namespace Logic.Action
{

	[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
	internal class GameActionType : Attribute
	{
		public readonly ACTION_TYPE type;
		public GameActionType(ACTION_TYPE type)
		{
			this.type = type;
		}

	}
}