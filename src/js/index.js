//首页渲染数据
function render(){
    $.ajax({
        url:'/api/list',
        dataType:'json',
        success:function(res){
            //console.log(res)
            if(res.code == 1){
                renderData(res.data)
            }
        }
    })
}
function renderData(data){
    var str = '';
    data.forEach((item)=> {
        str += ` <dl>
                    <dt><img src="imgs/${item.img}" alt=""></dt>
                    <dd>
                        <p>${item.type}<span>${item.销量}</span></p>
                        <b>￥${item.price}</b>
                    </dd>
                </dl>`
    });
    $(".main-load").append(str); 
    scroll.refresh() //重新计算元素高度
}

render()
//上拉加载
let scroll = new BScroll('#main',{
    scrollY:true,
    pullUpLoad:true,
    pullDownRefresh:true,
    probeType:2
})
scroll.on('pullingUp',()=>{
    setTimeout(()=>{
        scroll.finishPullUp();
        document.querySelector(".main-load").setAttribute('data-up',"loding...")
        //上拉渲染数据      
        render()
    },1000)
})

//点击综合


//排序
$('#filterData').on('click',function(){
    $(".box").css("display","block");
})
//点击价格
$(".price").on("click",function(){
    console.log($(this).text())
    $(".box").css("display","none");
    $(".main-load").css({
        "display":'flex',
        "flex-direction": "column"
    })
    $('.type').html($(this).text())
    var dataArr;
    $.ajax({
        url:'/api/list',
        dataType:'json',
        success:function(res){
            console.log(res)
            if(res.code == 1){
                 dataArr = res.data;
                 console.log(dataArr)
                function comp(proto){
                    return function(a,b){
                        return a[proto]-b[proto]
                    }
                }
                 dataArr.sort(comp("price")) 

                // console.log(dataArr)
                // renderData(dataArr)

               var str = '';
                dataArr.forEach((item)=> {
                    str += ` <dl>
                                <dt><img src="imgs/${item.img}" alt=""></dt>
                                <dd>
                                    <p>${item.type}<span>${item.销量}</span></p>
                                    <b>￥${item.price}</b>
                                </dd>
                            </dl>`
                });
                $(".main-load").html(str); 
                
                $(".main-load dl").css({
                    "display":'flex',
                    "width":'100%',
                    // "justify-content": "space-between"
                })
            }
        }
    })
   
})