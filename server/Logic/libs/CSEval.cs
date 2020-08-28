using System;
using System.Text;
using System.Collections.Generic;
using System.Collections;

namespace Utils

{
	delegate double CalDel(List<double> arg);
	/// <summary>
	/// 解析字符串为委托
	/// </summary>
	public class CSEval
	{
		private static Stack transStr(string str)
		{
			Stack ret = new Stack();
			Stack<string> operate = new Stack<string>();
			for (int i = 0; i < str.Length; i++)
			{
				char ch = str[i];
				if (isNumber(ch))
				{
					StringBuilder a = new StringBuilder(ch);
					while (i < str.Length)
					{
						i++;
						ch = str[i];
						if (isNumber(ch))
						{
							a.Append(ch);
						}
						else
						{
							break;
						}
					}
					ret.Push(Double.Parse(a.ToString()));
				}
				if (ch.ToString() == "{")
				{
					StringBuilder a = new StringBuilder();
					while (i < str.Length)
					{
						i++;
						ch = str[i];
						if (ch.ToString() == "}")
						{
							break;
						}
						a.Append(ch);
					}
					int idx = int.Parse(a.ToString());
					CalDel s = (List<double> arg) =>
					{
						return arg[idx];
					};
					ret.Push(s);
				}
				string op = ch.ToString();
				if (isOperate(op))
				{
					if (operate.Count == 0)
					{
						operate.Push(op);
					}
					else
					{
						string top = operate.Pop();
						if (top == "(")
						{
							operate.Push(top);
							operate.Push(op);
						}
						else
						{
							if (compareOperate(op, top))
							{
								operate.Push(top);
								operate.Push(op);
							}
							else
							{
								ret.Push(top);
								i--;
								continue;
							}
						}

					}

				}
				if (op == "(")
				{
					operate.Push(op);
				}
				if (op == ")")
				{
					while (operate.Count > 0)
					{
						string a = operate.Pop();
						if (a == "(")
						{
							break;
						}
						ret.Push(a);
					}
				}
			}

			while (operate.Count > 0)
			{
				object a = operate.Pop();
				ret.Push(a);
			}
			return ret;
		}
		private static bool isNumber(char ch)
		{
			return char.IsNumber(ch) || ch.ToString() == ".";

		}
		private static bool isOperate(string s)
		{
			return s == "+" ||
				s == "-" ||
				s == "*" ||
				s == "/";
		}
		private static bool compareOperate(string s1, string s2)
		{
			return (s1 == "*" || s1 == "/") && (s2 == "+" || s2 == "-");
		}
		public static void eval(string str){
			Stack exps = transStr(str);
			Stack ret = new Stack();
			while (exps.Count>0)
			{
				object temp = exps.Pop();
				if(temp is String ){
					object a =a


				}else{
					ret.Push(temp);
				}


			}

		}
		private static double calret(double a,double b ,string operate){
			if(operate =="+"){
				return a+b;
			}
			if(operate =="-"){
				return a-b;
			}
			if(operate =="*"){
				return a*b;
			}
			if(operate =="/"){
				return a/b;
			}
			return 0;
		}
		private static CalDel calret(CalDel a,double b ,string operate){
			if(operate =="+"){
				return (List<double> arg) => { return a(arg)+b;};
			}
			if(operate =="-"){
				return (List<double> arg) => { return a(arg)-b;};
			}
			if(operate =="*"){
				return (List<double> arg) => { return a(arg)*b;};
			}
			if(operate =="/"){
				return (List<double> arg) => { return a(arg)/b;};
			}
			return a;
		}
		private static CalDel calret(double b,CalDel a ,string operate){
			if(operate =="+"){
				return (List<double> arg) => { return a(arg)+b;};
			}
			if(operate =="-"){
				return (List<double> arg) => { return b- a(arg);};
			}
			if(operate =="*"){
				return (List<double> arg) => { return a(arg)*b;};
			}
			if(operate =="/"){
				return (List<double> arg) => { return b/a(arg);};
			}
			return a;
		}
		private static CalDel calret(CalDel a,CalDel b ,string operate){
			if(operate =="+"){
				return (List<double> arg) => { return a(arg)+b(arg);};
			}
			if(operate =="-"){
				return (List<double> arg) => { return a(arg)-b(arg);};
			}
			if(operate =="*"){
				return (List<double> arg) => { return a(arg)*b(arg);};
			}
			if(operate =="/"){
				return (List<double> arg) => { return a(arg)/b(arg);};
			}
			return a;
		}
	}
}
