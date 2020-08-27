using System;
using System.Linq;
using System.Text;
using System.Collections.Generic;

using System.CodeDom;
using System.CodeDom.Compiler;
using Microsoft.CSharp;
using System.Reflection;
namespace Utils
{
    public class EVAL
    {
        private static string prefix = @"using System;
                                  public static class DynamicClass
                                  {
                                       public static void Bomb()
                                       {";

        public static string postfix = @"}}";

        public string content { get; set; }

        public void Eval()
        {
            if (content == "")
            {
                Console.WriteLine("必须为Content属性赋予值");
                return;
            }
            string code = prefix + content + postfix;
			CompilerResults result = null;

            using (var provider = new CSharpCodeProvider())
            {
                var options = new CompilerParameters();
                options.GenerateInMemory = true;

                result = provider.CompileAssemblyFromSource(options, code);

                if (result.Errors.HasErrors)//编译有错误
                {
                    var errorMsg = new StringBuilder();
                    foreach (CompilerError error in result.Errors)
                    {
                        errorMsg.AppendFormat("Line:{0},Column:{1},Content:{2}", error.Line, error.Column, error.ErrorText);
                    }
                    Console.WriteLine(errorMsg.ToString());
                }
                else//运行类 DynamicClass 中的HelloWorld方法
                {

                    Type dynamicClass = result.CompiledAssembly.GetType("DynamicClass");
                    dynamicClass.InvokeMember("Bomb", BindingFlags.InvokeMethod | BindingFlags.Static | BindingFlags.Public, null, null, null);
                }
            }

        }
    }
}