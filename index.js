// var title = $('#title-input').val();
// var body = $('#body-input').val();
var numCards = 0;
// var qualityVariable = "swill";

// $(document).ready(newCard());
// passed object in as paramenter and onto values
    // prepending to DOM - not working
function addTodoItemToDom(obj) {
console.log(obj);

    $('.bottom-box').append(`
      <li id="${obj.id}" class="card-container">
        <h2 class="title-of-card"> ${obj.title} </h2>
        <button class="delete-button"></button>
        <p>${obj.body}</p>
        <button class="upvote"></button>
        <button class="downvote"></button>
        <p class="quality">quality:<span class="qualityVariable">${obj.quality}</span></p>
        <hr> 
      </li>`);
};

// reformat to a constructor function with defined parameters
function cardObject(id, title, body, quality) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.quality = quality;
    };

    cardObject();

    function somethingOnLoad() {


        // put up an array and use that. 
// if something in local storage, get it parse it and run it the function that appends to dom. 

// if theres nothing in local storage do nothing. 


    }

    somethingOnLoad();

$.each(localStorage, function(key) {
    var objectFromStorage = localStorage.getItem(key);
    var cardData = JSON.parse(objectFromStorage);
    numCards++;
    // $( ".bottom-box" ).prepend(addTodoItemToDom(key, cardData.title, cardData.body, cardData.quality));
    addTodoItemToDom(cardData);
});

function localStoreCard (cardObject) {
    var cardString = JSON.stringify(cardObject);
    console.log(cardObject);
    console.log(cardString);
    localStorage.setItem('card' + numCards  , cardString);
}

$('.save-btn').on('click', saveButton)

function saveButton (event) {
    event.preventDefault();
    // console.log($('#title-input').val())
    // if ($('#title-input').val() === "" || $('#body-input').val() === "") {
    //    return false;
    // };  
    // changed Card to cardObject, added keyword new
    var ideaObject = new cardObject(Date.now(), $('#title-input').val(), $('#body-input').val(), 'swill')
    // console.log(ideaObject)
    numCards++;
    // $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#body-input').val(), 'swill')); 
    //passing cardObject into localStoreCard
    localStoreCard(ideaObject);
    //passing cardObject into newCard to append to DOM
    addTodoItemToDom(ideaObject);
    $('form')[0].reset();
};

$(".bottom-box").on('click', function(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
});
      










