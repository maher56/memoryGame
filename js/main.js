$(() => {
const cards = $(".board .content .card");
let orders  = [
    [1 , 5 , 2 , 3 , 4 , 6 , 8 , 7 , 15 , 12 , 16 , 13 , 11 , 9 , 14 , 10],
    [5 , 1 , 6 , 2 , 4 , 8 , 3 , 7 , 15 , 10 , 9 , 16 , 14 , 13 , 11 , 12],
    [4 , 2 , 3 , 7 , 6 , 8 , 1 , 5 , 14 , 12 , 15 , 16 , 9 , 11 , 10 , 13],
    [8 , 2 , 1 , 5 , 3 , 6 , 7 , 4 , 16 , 9 , 10 , 13 , 15 , 12 , 14 , 11],
    [5 , 2 , 4 , 3 , 1 , 6 , 7 , 8 , 11 , 9 , 15 , 13 , 16 , 10 , 12 , 14],
    [7 , 4 , 8 , 3 , 6 , 1 , 5 , 2 , 10 , 16 , 11 , 9 , 15 , 13 , 14 , 12]
]

let order = Math.floor(Math.random() * orders.length);
cards.each((i , e) => {$(e).css("order" , orders[order][i]);});

cardHeight();
$(window).resize( () => cardHeight());

cards.on("click", function() {
    let fliped = cards.parent().children(".flip");
    if($(this).hasClass("flip") ||
    $(this).hasClass("checked") ||
    fliped.length == 2)return;
    
    $(this).addClass("flip");
    fliped = cards.parent().children(".flip");
    if(fliped.length == 2) {
        if(fliped.eq(0).attr("id") === fliped.eq(1).attr("id"))
            rightChoice(fliped);
        else 
            wrongChoice(fliped);
    }
})
let sounConuter = 0;
function rightChoice(fliped) {
    setTimeout(() => {
        fliped.removeClass("flip");
        fliped.addClass("checked");
        sound(true)
        setTimeout(() => {
            if($(".board .content .card.checked").length == 16){
                if(confirm("end Game , do you want Sart Again?"))
                    window.location.reload();
            }
        } , 200)
    } , 400)
}

function wrongChoice(fliped) {
    setTimeout(() => {
        fliped.removeClass("flip");
        sound(false)
    } , 400)    
}
function sound(right) {
    if(right) {
        $("body").append(`<audio class = 'a${++sounConuter}' autoplay src='img/right.wav'></audio>`)
    }else {
        $("body").append(`<audio class = 'a${++sounConuter}' autoplay src='img/wrong.wav'></audio>`)
    }
    let x = sounConuter;
    setTimeout(() => {
        $(`a${x}`).remove();
    })
}

function cardHeight() {
    cards.outerHeight(cards.outerWidth() , 1)
}
})