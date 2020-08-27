using System;
using System.Collections.Generic;

namespace Utils

{
	delegate double cal(List<double> arg);
	/// <summary>
	/// 解析字符串为委托
	/// </summary>
	public class CSEval
	{

		/// <summary>
		/// 获取括号中的计算表达式
		/// （递归）
		/// </summary>
		/// <param name="express"></param>
		public static void GetBraceExpress(ref string express)
		{
			int leftBraceMaxIndex = -1;
			IList<int> rightBraceMinIndexs = new List<int>();
			for (int i = 0; i < express.Length; i++)
			{
				if (express[i].ToString() == "(")
				{
					leftBraceMaxIndex = i;
				}
				if (express[i].ToString() == ")")
				{
					rightBraceMinIndexs.Add(i);
				}
			}
			if (rightBraceMinIndexs.Count == 0) return;
			int rightBraceIndex = 0;
			foreach (var item in rightBraceMinIndexs)
			{
				if (item > leftBraceMaxIndex)
				{
					rightBraceIndex = item;
					break;
				}
			}

			string braceExpress = express.Substring(leftBraceMaxIndex, rightBraceIndex - leftBraceMaxIndex + 1);
			double result = CalcExpress(braceExpress.TrimStart('(').TrimEnd(')')); //计算（）中的表达式
			express = express.Replace(braceExpress, result.ToString());  //结果替换 （）表达式
			if (express.IndexOf("(") != -1 && express.IndexOf(")") != -1)
			{
				GetBraceExpress(ref express);
				return;
			}
		}

		/// <summary>
		/// 计算表达式
		/// </summary>
		/// <param name="express">表达式</param>
		/// <returns>表达式结果</returns>
		public static double CalcExpress(string express)
		{
			List<double> numbers = new List<double>(); //表达式中的数字
			List<char> operaters = new List<char>();   //表达式中的操作符
			int tempIndex = 0;
			for (int i = 0; i < express.Length; i++)
			{
				if (!char.IsNumber(express[i]) && char.IsNumber(express[i - 1]) && i > 0)
				{
					if (tempIndex != 0)
						tempIndex = tempIndex + 1;
					numbers.Add(double.Parse(express.Substring(tempIndex, i - tempIndex)));
					operaters.Add(express[i]);
					tempIndex = i;
				}
			}
			numbers.Add(double.Parse(express.Substring(tempIndex + 1, express.Length - tempIndex - 1)));
			//开始计算
			double result = 0;
			if (operaters.Count == 0)
			{
				return double.Parse(express);
			}
			else
			{
				CalcMultiplyDivide(numbers, operaters); //计算乘除
				result = CalcAddSubduction(numbers, operaters); //计算加减
			}
			return result;
		}

		/// <summary>
		/// 递归计算表达式中的乘/除运算
		/// </summary>
		/// <param name="numbers">表达式中的数字集合</param>
		/// <param name="operaters">操作符集合</param>
		public static void CalcMultiplyDivide(List<double> numbers, List<char> operaters)
		{
			for (int i = 0; i < operaters.Count; i++)
			{
				bool temp = false;
				double n = 0;
				if (operaters[i] == '*')
				{
					n = numbers[i] * numbers[i + 1];
					temp = true;
				}
				else if (operaters[i] == '/')
				{
					n = numbers[i] / numbers[i + 1];
					temp = true;
				}
				if (temp)
				{
					operaters.RemoveAt(i);
					numbers.RemoveRange(i, 2);
					numbers.Insert(i, n);
					CalcMultiplyDivide(numbers, operaters);
					break;
				}
			}
		}

		/// <summary>
		/// 递归计算加减
		/// </summary>
		/// <param name="numbers">表达式中的数字集合</param>
		/// <param name="operaters">操作符集合</param>
		/// <returns>计算的结果</returns>
		public static double CalcAddSubduction(List<double> numbers, List<char> operaters)
		{

			for (int i = 0; i < operaters.Count; i++)
			{
				bool temp = false;
				double n = 0;
				if (operaters[i] == '+')
				{
					n = numbers[i] + numbers[i + 1];
					temp = true;
				}
				else if (operaters[i] == '-')
				{
					n = numbers[i] - numbers[i + 1];
					temp = true;
				}
				if (temp)
				{
					operaters.RemoveAt(i);
					numbers.RemoveRange(i, 2);
					numbers.Insert(i, n);
					CalcAddSubduction(numbers, operaters);
					break;
				}
			}
			double result = 0;
			if (operaters.Count == 0)
				result = numbers[0];
			return result;
		}
	}
}
