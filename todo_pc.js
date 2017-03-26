var todoItems='';
var length=0;
for(var i=0,len=localStorage.length;i<len;i++)
{
    var key=localStorage.key(i);
    if(key.indexOf('todo')==0)
    {
        length++;
        todoItems+=localStorage.getItem(key);
    }
}

/*
 //var todoItems=localStorage.getItem('todo');
 //console.log(typeof todoItems,todoItems);
 //当todo属性为空的话返回对象null
 if(todoItems==null){
 todoItems='';
 }*/

$('.todo-items').html(todoItems);

$('li').click(function () {
    $(this).toggleClass('completed');
});

$('li span').click(remove);

$(".slide input").keyup(function (e) {
    if(e.which==13)
    {
        var newItem='<li id="todo'+(++length)+'"><span onclick="remove(event,this)"><i class="fa fa-trash-o"></i></span>'+
            $(this).val()+'</li>';
        $('.todo-items').append(newItem);
        $('.todo-items li:last-child span').click(remove);
        $(this).val('');

        localStorage.setItem('todo'+length,newItem);
    }
});

$('h1 i').click(function () {
    $('.slide').slideToggle();
    $('.slide input').focus();
});

function remove() {
    var item=$(this).parent().attr('id');
    localStorage.removeItem(item);
    $(this).parent().fadeOut(function () {
        $(this).remove();
    })
}