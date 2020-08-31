using System;
using System.Collections.Generic;
namespace Logic
{
	struct PlayerInfo
	{
		public string uid;
	}
	struct UserCommand
	{
		public string uid;
		public string battleId;
		public COMMAND_ID commandId;
		public object args;
	}
	struct AcitonArg
	{
		public int creator;
		public int target;
	}

	delegate double Dhandler(double originValue);
	struct Decorator
	{
		public string name;
		public Dhandler apply;
	}
		struct Derived
	{
		public List<string> baseAtrs;
		public bool isDirty;
		public System.Action update;
	}
	struct IAttribute
	{
		public string name;
		public double value;
		public List<Dhandler> dHandlers;
		public HashSet<IAttribute> effected;//用于反查关联属性
		public Derived? derived;
	}

}