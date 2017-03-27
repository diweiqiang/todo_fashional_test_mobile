var todoItems='';
var length=0;
//record the start of the touch
var startX;
var startY;
var moveEndX;
var moveEndY;
var timeStart=0;
var timeEnd=0;

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

$('h1 i').on('touchend',function () {
    $('.slide').slideToggle();
    $('.slide input').focus();
});

$('.slide input').keyup(function (e) {
    if($(this).val()!='')
    {
        $('#addbtn').removeAttr('disabled');
    }
    else
    {
        $('#addbtn').attr('disabled','true');
    }
});

$('li').on('touchend',completed);

$('#addbtn').on('touchend',function () {
    var test1=$('.slide input').val();
    if(test1=='') return;
    var newItem='<li id="todo'+(++length)+'"><span onclick="remove(event,this)"><i class="fa fa-trash-o"></i></span>'+
        test1+'</li>';
    $('.todo-items').append(newItem);
    $('.todo-items li:last-child span').click(remove).parent().on('touchend',completed).on('touchstart',touchstart).on('touchmove',touchmove);
    $('.slide input').val('');

    localStorage.setItem('todo'+length,newItem);
 });

$('li').on('touchstart',touchstart);

 $('li').on('touchmove',touchmove);

 $('li span').on('touchend',remove);

 function completed() {
     timeEnd=Date.now();
     if((timeEnd-timeStart)<150){
         $(this).toggleClass('completed');
     }
 }

 function touchstart(e) {
     //e.preventDefault();
     startX=e.originalEvent.changedTouches[0].pageX;
     startY=e.originalEvent.changedTouches[0].pageY;

     timeStart=Date.now();
 }

 function touchmove(e) {
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
 }

function remove() {
    var item=$(this).parent().attr('id');
    localStorage.removeItem(item);
    $(this).parent().fadeOut(function () {
        $(this).remove();
    })
}