var todoItems='';
var length=0;
//record the start of the touch
var startX;
var startY;
var moveEndX;
var moveEndY;

for(var i=0,len=localStorage.length;i<len;i++)
{
    var key=localStorage.key(i);
    if(key.indexOf('todo')==0)
    {
        length++;
        todoItems+=localStorage.getItem(key);
    }
}

$('.todo-items').html(todoItems);

/*$('li').on('touchend',function () {
    $(this).toggleClass('completed');
});*/

$('h1 i').on('tap',function (e) {
    e.preventDefault();
    if($('.slide').css('display')=='block'){
        $('.slide').css('display','none');
    }else {
        $('.slide').css('display','block');
        $('.slide input').focus();
    }

});

/*$('.slide input').blur(function () {
    var newItem='<li id="todo'+(++length)+'"><span onclick="remove(event,this)"><i class="fa fa-trash-o"></i></span>'+
        $(this).val()+'</li>';
    $('.todo-items').append(newItem);
    $('.todo-items li:last-child span').click(remove);
    $(this).val('');

    localStorage.setItem('todo'+length,newItem);
});*/


$('li').swipeRight(function () {
 $(this).find('span').css({width:'2.5em',opacity:'1'});
 });
$('li').swipeLeft(function () {
 $(this).find('span').css({width:'0',opacity:'0'});
 });

 $('li span').tap(remove);

/*$('li').on('touchstart',function (e) {
    //e.preventDefault();
    startX=e.originalEvent.changedTouches[0].pageX;
    startY=e.originalEvent.changedTouches[0].pageY;
});

$('li').on('touchmove',function (e) {
    //e.preventDefault();
    moveEndX=e.originalEvent.changedTouches[0].pageX;
    moveEndY=e.originalEvent.changedTouches[0].pageY;
    X=moveEndX-startX;
    Y=moveEndY-startY;

    if (Math.abs(X)>Math.abs(Y) && X>0)
    {
        $(this).find('span').css({width:'2.5em',opacity:'1'});
    }
    else if(Math.abs(X)>Math.abs(Y) && X<0)
    {
        $(this).find('span').css({width:'0',opacity:'0'});
    }
});

$('li span').on('touchend',remove);*/

function remove() {
    var item=$(this).parent().attr('id');
    localStorage.removeItem(item);
    $(this).parent().fadeOut(function () {
        $(this).remove();
    })
}