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
    }
}

render()
//上拉加载
let scroll = new BScroll('#main',{
    scrollY:true,
    pullUpLoad:true,
    pullDownRefresh:true,
})
scroll.on('pullingUp',()=>{
    setTimeout(()=>{
        scroll.finishPullUp();
        document.querySelector(".main-load").setAttribute('data-up',"loding...")
        //上拉渲染数据      
        render()
    },1000)
})

//排序
$('#filterData').on('click',function(){
    $(".box").css("display","block");
})
//点击价格
$(".price").on("click",function(){
    $(".box").css("display","none");
    $.ajax({
        url:'/api/list',
        dataType:'json',
        success:function(res){
            console.log(res)
            if(res.code == 1){
                var dataArr = res.data;
                console.log(dataArr);
                function comp(proto){
                    return function(a,b){
                        return a[proto]-b[proto]
                    }
                }
                dataArr.sort(comp("price")) 

                console.log(dataArr)
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
            }
        }
    })
   
})