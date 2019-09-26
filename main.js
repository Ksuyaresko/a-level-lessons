
function codePreview(id, func) {
    document.getElementById(id).nextElementSibling.textContent = func;
}

// lesson 07

function showDemo71() {
    var container = document.getElementById('demo_7_1');
    var el = container.appendChild(document.createElement('p'));
    el.textContent = 'click me';
    el.style.cursor = 'pointer';
    el.addEventListener('click', (event)=> {
        var img = container.appendChild(document.createElement('img'));
        img.src = 'https://picsum.photos/200/200';
        img.style = `transition: all 1s;
                    cursor: pointer;
                    width: 100px;
                    height: auto;`

        function scaleImg(event) {
            event.target.style.width = '200px'
        }

        img.addEventListener('mouseover', scaleImg);
        img.addEventListener('click', (event) => {
            event.target.parentNode.removeChild(event.target)
            img.removeEventListener('mouseover', scaleImg);
        })
    })
}
showDemo71();
codePreview('demo_7_1', showDemo71);

function showDemo72() {
    var collection = ['main', 'section', 'header', 'article'];
    var titles = ["first", "second", "third", "fourth"];
    var container = document.getElementById('demo_7_2');
    function over ( event ) {
        event.target.style.backgroundColor = '#ffff0050'
    }
    function out ( event ) {
        event.target.style.backgroundColor = '#ff00ff50'
    }
    function clickHandler ( event ) {
        event.stopPropagation();
        event.target.parentElement.removeChild(event.target);
    }

    titles.forEach (
        function ( tag, index  ) {
            var el = container.appendChild(document.createElement(collection[index]));
            el.style = `padding: 50px;
                        background-color: #ff00ff50;
                        border: dotted 1px yellow;`;
            el.title = titles[index];
            el.addEventListener('mouseout', out);
            el.addEventListener('mouseover', over);
            el.addEventListener('click', clickHandler);
            container = el
        }
    )
}

showDemo72();
codePreview('demo_7_2', showDemo72);

function codePreview(id, func) {
    document.getElementById(id).nextElementSibling.textContent = func;
}

function showDemo73() {
    var collection = ['main', 'section', 'header', 'article', 'div', 'div', 'div'];
    var container = document.getElementById('demo_7_3');
    function over ( event ) {
        event.target.style.backgroundColor = '#ffff0050'
    }
    function out ( event ) {
        event.target.style.backgroundColor = '#ff00ff50'
    }
    function clickHandler ( event ) {
        event.stopPropagation();
        event.target.children[0] ?
            event.target.parentNode.appendChild (
                event.target.parentNode
                    .removeChild( event.target ).children[0]
            ) :
            event.target.parentNode
                .removeChild( event.target )
    }

    collection.forEach (
        function ( tag, index  ) {
            var el = container.appendChild(document.createElement(tag));
            el.style = `padding: 50px;
                        background-color: #ff00ff50;
                        border: dotted 1px yellow;`;
            el.title = index + 1;
            el.addEventListener('mouseout', out);
            el.addEventListener('mouseover', over);
            el.addEventListener('click', clickHandler);
            container = el
        }
    )
}

showDemo73();
codePreview('demo_7_3', showDemo73);

// lesson 08
function showDemo81() {
    let time =  new Date();
    let el = document.getElementById('demo_8_1')
                        .appendChild(document.createElement('span'));
    let updateTime = () => {
        el.innerHTML = `${new Date().toLocaleTimeString()}`;
        new Date() - time < 100000 ?
            requestAnimationFrame ( updateTime ) :
                el.innerHTML = '100 seconds passed :('
    }
    updateTime()
}
showDemo81();
codePreview('demo_8_1', showDemo81);

function showDemo82() {
    var typeMessage = ( function ( velocity ) {
        let container = document.getElementById ( "demo_8_2" ) ?
            document.getElementById ( "demo_8_2" ) :
            document.body.appendChild (
                document.createElement ( "h3" )
            );
        container.style = `color: magenta;`
        var index = 1;
        return function ( message ) {
            container.innerHTML = message.substring(0, index);
            index++ < message.length ?
                setTimeout(arguments.callee.bind(null, message), 1000) : null;
        }
    })( 1 )

    typeMessage ( `Welcome to the hell` )
}

showDemo82();
codePreview('demo_8_2', showDemo82);

function showDemo83() {
    function User ( name ) {
        this.name = name;
        this.id = this.counter();
    }

    User.prototype = {
        counter: (() => {
            var count = 0;
            return function() {
                return this.id !== undefined ? this.id : count++
            }
        })()
    };

    var users = [
        new User ( "Семен" ),
        new User ( "Антон" ),
        new User ( "Демьян" ),
        new User ( "Василий" )
    ];
    users[1].id = users[1].counter();

    User.prototype.toString = function() {
        return `{name: ${this.name}; id: ${this.id}}`
    }
    document.getElementById ( "demo_8_3" ).innerHTML = users
}

showDemo83();
codePreview('demo_8_3', showDemo83);