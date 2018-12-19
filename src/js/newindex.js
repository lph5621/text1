require(["./js/config.js"],function(){
    require(["jquery","bscroll"],function($,bscroll){
        var pagenum = 1,
            limit=5,
            total = 0;

        var scroll = new bscroll('#main',{
            scrollY:true,
            probeType:2,
            click:true
        })

        var _mainLoad = $(".main-load");
        console.log(_mainLoad)

        scroll.on('scroll',function(){
           // console.log(this.y,"yyy")
           // console.log(this.maxScrollY,"max")
           if(this.y < this.maxScrollY -50){
               _mainLoad.attr('data-up','释放加载更多')
           }else if(this.y < this.maxScrollY - 25){
                _mainLoad.attr('data-up','上拉加载')
           }
        })
        scroll.on('touchEnd',function(){
            if(_mainLoad.attr('data-up') == "释放加载更多"){
               console.log(6666)
                if(pagenum < total){
                    pagenum++;
                    getData()
                    _mainLoad.attr('data-up',"上拉加载") 
                }else{
                    _mainLoad.attr('data-up',"没有更多数据") 
                }
               
           }
        });

        getData()
        function getData(){
            $.ajax({
                url:'/api/list',
                dataType:'json',
                data:{
                    pagenum:pagenum, //第一页
                    limit:limit, //一页5条数据
                },
                success:function(res){
                    console.log(res)
                  if(res.code == 1){
                      total = res.total;
                       render(res.data)
                  }
                   
                }
            })
        }

        function render(data){
            var str = '';
            data.forEach((item)=>{
                str += `<dl>
                            <dt><img src="imgs/${item.img}" alt=""></dt>
                            <dd>
                                <p>羽绒服</p>
                                <b>价格：${item.price}</b><br>
                                <span>销量${item.销量}</span>
                            </dd>
                        </dl>`
            })
            _mainLoad.append(str);
            scroll.refresh();
        }

        //点击事件 
        addEvent()
        function addEvent(){
            $('#filterData').on("click",function(){
                $(".box").css('display',"block");
            })

            //点击价格
            $(".price").on("click",function(){
                $.ajax({
                    url:'/api/list',
                    dataType:'json',
                    data:{
                        pagenum:pagenum, //第一页
                        limit:limit, //一页5条数据
                    },
                    success:function(res){
                        console.log(res)
                      if(res.code == 1){
                          total = res.total;
                           render(res.data)
                           var newData = res.data.sort(function(a,b){
                               return a['price'] - b['price']
                           })
                           console.log(newData)

                           var str = '';
                           newData.forEach((item)=>{
                               str += `<dl>
                                           <dt><img src="imgs/${item.img}" alt=""></dt>
                                           <dd>
                                               <p>羽绒服</p>
                                               <b>价格：${item.price}</b><br>
                                               <span>销量${item.销量}</span>
                                           </dd>
                                       </dl>`
                           })
                           _mainLoad.html(str);
                           scroll.refresh();
                      }
                       
                    }
                })

                $(".main-load dl").css({
                    "display":"flex",
                    "width":"100%",
                })
            })
        }

    })
})