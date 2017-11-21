# ConvoJs
## jQuery Conversational UI Plugin. [Checkout the Demo](https://convojs.firebaseapp.com/)

## Setup

#### Add the following code to your HTML page


```html
<div class="top-bar"></div>
 <div class="header-tools">
     <a href="javascript:void(0)">
         <img src="img/logo-md.png" alt="ConvoJs - Conversation UI jQuery Plugin" id="logo"/>
     </a>
 </div>
 <div class="convo__wrapper">
     <ul class="bubble__wrapper">
     </ul>
 </div>
 <div class="cui__response"></div>
 <div class="background">&nbsp;</div>
```

#### Include convo.css file in your head tag

```html
<link href="css/convo.css" rel="stylesheet" type="text/css" />
```

#### Don't forget to include jQuery

```html
<script src="js/jquery.js" type="text/javascript"></script>
```

#### Add data.js file, this is where the conversation is stored

```html
<script src="js/data.js" type="text/javascript"></script>
```

#### Add the convojs plugin file

```html
<script src="js/convo.js" type="text/javascript"></script>
```

#### Finaly initialize the plugin

```javascript
$(document).ready(function () {

     //include the js
     $(".bubble__wrapper").convo({
         headerTopColor: "#f00",
         logo: "img/logo-md.png",
         pageColor: "linear-gradient(to right, #83a4d4, #b6fbff)",
         data: chatz,
         inputCharLimit: 50
     });

     //we need this for contentEditable placeholder
     $("[contenteditable]").focusout(function () {
         var element = $(this);
         if (!element.text().trim().length) {
             element.empty();
         }
     });

 });
```

## And you'll done, Happy Coding :)











