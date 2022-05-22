    const btnGroup = document.querySelector(".btnGroup");
	const dp = document.querySelector("#dp");  //显示历史值
	const res = document.querySelector('#res') //显示当前值

    let img = document.createElement('img');  //创建 img元素标签
	img.setAttribute("src","./image/backspace.svg")  //给img设置src属性
	img.style.width="20px"; 	
    let Del = document.getElementById("Del");  
	Del.appendChild(img);  //将图片追加按钮上

	let currentNum = "",
		historyNum = "",
		symbol = "";    //首先给当前值,历史值,符号进行初始化
    
	//利用事件委托将按钮事件委托给父级
	btnGroup.onclick =  e => { //给父元素绑定点击事件
		const type = e.target.dataset.value; //利用事件捕获,点击谁,就会获得data-value中的值
		const tex = e.target.textContent; //获得数字按钮的内容

		if (e.target.matches('button')) { // 判断只有点击button按钮,才会进行type的判断(防止点击按钮之间的空隙)
			
			if (type === "clear") {      //清空键的判断
				cal.clear();
			} else if (type === "del") { //删除键的判断
				cal.dl();
			} else if (type === "op") {  //判断按钮上所有的操作符
				cal.op(tex);
			} else if (type === "eq") { 
				cal.cl(); //会调用构造函数中的原型方法
			} else {
				cal.showNum(tex); //如果是数字,就会传入文本的内容
			}
			ShowExpresion(); //显示在屏幕效果
		}

	}

	const cal = new Calculate(); //实例化

    
    function Calculate(){    // 构造器里面添加两个属性方法
        this.clear =()=>{
			currentNum = '';
		    historyNum = '';
		    symbol = ''; //将三个值全清空
		}

		this.dl = ()=>{
			if (!currentNum.toString().length) return //判断一开始是否为空,如果为空,什么也不做
		    currentNum = currentNum.toString().slice(0, -1); //截取字符串slice,截取最后一位并删除;
		}
	}

	function ShowExpresion() {
		res.textContent = currentNum; //当前值会一直显示在第二行窗口
		if (symbol) {                 //判断当有符号出现,历史值会显示第一行,形成跳转效果
			dp.textContent = `${historyNum}${symbol}${currentNum}`; 
		} else {
			dp.textContent = "";   //如果没有符号出现,就不会出现在第一行窗口
		}
	}
     
	//利用原型链知识,在根Object添加方法
	Object.prototype.op=(tex)=>{
        if (!currentNum.toString().length) return //如果直接点击操作符,什么也并不做
			symbol = tex;
			historyNum = currentNum;
			currentNum = '';
	}

	Object.prototype.showNum =(val)=>{
		currentNum = currentNum + val;
	}
    
	//在构造器的原型上添加方法
	Calculate.prototype.cl =()=>{
		let result = 0;
		    const prev = parseFloat(historyNum); //利用PraseFloat 将字符串转为浮点数类型
		    const current = parseFloat(currentNum);
		    switch (symbol) {
			    case "+":
				    result = prev + current;
				    break;
			    case "-":
				    result = prev - current;
				    break;
			    case "x":
				    result = prev * current;
				    break;
			    case "/":
				    result = prev / current;
				    break;
			    case "%":
				    result = prev % current;
				    break;
			    default:
				    return;
		    }

            currentNum = result.toString().length >=12 ? result.toFixed(2) : result ;//对循环小数进行保留判断
		    symbol = '';  
		    historyNum = '';  //显示最终结果,之前的历史值和符号清空
	}
