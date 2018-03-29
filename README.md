# ConvoJs
## jQuery Conversational UI Plugin. [Checkout the Demo](https://convojs.firebaseapp.com/)

<img src="https://convojs.firebaseapp.com/img/convojs.gif" alt="ConvoJs" width="230px"/>

### Setup

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

#### Use this structure to add your data, the path 'intro' is mandatory since it's the nitial path when the page loads.
#### Each item contains a path, messages and choices
#### The 'path' is the unique identifier of that item

```javascript
var chatz = [{
        "path": "intro",
        "messages": [{
                "text": "What’s up fam!",
                "author": "ConvoJs"
            },
            {
                "text": "What is 1 + 1?",
                "author": "ConvoJs"
            }
        ],
        "choices": [
            {
                "path": "block1",
                "text": "Meh",
                "type": "input"
            },
            {
                "path": "block1",
                "text": "Meh",
                "type": "button",
                "expected": "2",
                "pathTrue": "block1-correct",
                "pathFalse": "block1-wrong"
            }
        ]
    }, {
        "path": "block1-correct",
        "messages": [{
                "text": "You got it, good job",
                "author": "ConvoJs"
            }
        ],
        "choices": [{
                "path": "block2",
                "text": "Continue",
                "write": false
            }
        ]
    }, {
        "path": "block1-wrong",
        "messages": [{
                "text": "Wrong Answer!",
                "author": "ConvoJs"
            }
        ],
        "choices": [{
                "path": "intro",
                "text": "Try Again",
                "write": false
            }
        ]
    },{
        "path": "block2",
        "messages": [
            {
                "text": "Now, what is 2 + 3?",
                "author": "ConvoJs"
            }
        ],
        "choices": [
            {
                "path": "block2",
                "text": "Meh",
                "type": "input"
            },
            {
                "path": "block2",
                "text": "Meh",
                "type": "button",
                "expected": "5",
                "pathTrue": "block2-correct",
                "pathFalse": "block2-wrong"
            }
        ]
    }, {
        "path": "block2-correct",
        "messages": [{
                "text": "Fantastic! ",
                "author": "ConvoJs"
            }
        ],
        "choices": [{
                "path": "block__",
                "text": "That's all for now!",
                "write": false
            }
        ]
    }, {
        "path": "block2-wrong",
        "messages": [{
                "text": "Wrong Answer!",
                "author": "ConvoJs"
            }
        ],
        "choices": [{
                "path": "intro",
                "text": "Try Again",
                "write": false
            }
        ]
    }];
```

#### Add the convojs plugin file

```html
<script src="js/convo.js" type="text/javascript"></script>
```

#### Finally initialize the plugin

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

## And you are done, Happy Coding :)











