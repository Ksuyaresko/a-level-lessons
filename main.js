
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

// lesson 09

function showDemo91() {
    function typeMessage ( message, velocity ) {
        var container = document.getElementById ( "demo_9_1" ) ?
            document.getElementById ( "demo_9_1" ) :
            document.body.appendChild (
                document.createElement ( "h3" )
            );
        container.style = `color: magenta;`;
        message.split('').reduce((res, item, index) => {
            setTimeout(() => {
                container.innerText = res
            }, index*1000);
            return res + item
        }, '')
    }

    typeMessage ( `Welcome to the hell`, 1 )
}

showDemo91();
codePreview('demo_9_1', showDemo91);

function showDemo92() {
    var users = (
        function ( list ) {
            var users = [];
            for ( var user of list )
                users.push ({
                    name: user,
                    present: false
                });

            return {
                setUserPresent ( userName, present ) {
                    users.forEach((item) => {
                        item.name === userName ? item.present = !!present : null
                    })
                },
                showPresent () {
                    return users.filter((user) => user.present)
                                .map((user) => user.name);
                },
                showAbsent () {
                    return users.filter((user) => !user.present)
                                .map((user) => user.name);
                }
            }
        }
    )( [ "Иван", "Дмитрий", "Степан", "Михаил" ] )

    const container = document.getElementById ( "demo_9_2" );
    container.appendChild(document.createElement('div'))
        .innerText = `Absent: ${users.showAbsent()}`

    users.setUserPresent( "Иван", "+" )
    users.setUserPresent( "Михаил", "присутствовал" )
    users.setUserPresent( "Степан", true )

    container.appendChild(document.createElement('div'))
        .innerText = `Present: ${users.showPresent()}`
}

showDemo92();
codePreview('demo_9_2', showDemo92);

function showDemo93() {
    const container = document.getElementById ( "demo_9_3" );
    container.className += ' second-level-menu';
    container.textContent = 'has class second-level-menu';

    let changeClass = ( classname, styleString ) => (
        Array.from ( document.styleSheets ).reduce((res, styleSheet, index, styleSheetArr) => {
            !styleSheet.href && Array.from ( styleSheet.cssRules ).forEach((selector, selectorIndex, ) => {
                    if(selector.selectorText === `.${classname}`) {
                        styleSheet.addRule(selector.selectorText, styleString, selectorIndex);
                        res = styleSheetArr;
                    }
                });
                return res
        }, [])
    ).length > 0 ? console.log ( "found" ) :
        document.head.appendChild (
            document.createElement ( "style" )
        ).textContent = `.${classname} {${styleString}}`

    changeClass (
        "second-level-menu",
        "background-color: red!important;"
    )

}

showDemo93();
codePreview('demo_9_3', showDemo93);

// lesson 10

function showDemo101(id) {
    let messages = [
        "backspace",
        "enter",
        "shift",
        "control",
        "delete",
        "space",
        "subtract"
    ]

    var log = {};

    var sendMessage = ( message, callback ) =>
        setTimeout (
            () => callback ( message ),
            Math.random () * 7000
        )

    handler = (msg) => {
        Object.assign(log, {[getKey()]: msg});
        document.getElementById(id).innerText = log
    };

    messages.forEach (
        message => sendMessage ( message, handler )
    );

    getKey = () => {
        var key = new Date().toLocaleString().split(", ")[1];
        return log [ key ] ? key + "[2]" : key
    };

    log.__proto__.toString = function() {
        return JSON.stringify(this)
    }
}

showDemo101('demo_10_1');
codePreview('demo_10_1', showDemo101);

function showDemo102(id) {
    function User ( name ) {
        this.name = name;
        var presence = false;
        Object.defineProperty(this, 'presence', {
            get: () => presence,
            set: pres => { presence = !!pres }
        })
    }

    let user = new User ( "Ivan" );

    const container = document.getElementById(id);
    container.appendChild(document.createElement('div')).innerHTML = `user.presence: ${user.presence}`;

    user.presence = "+";
    container.appendChild(document.createElement('div')).innerHTML = `user.presence: ${user.presence}`;
}

showDemo102('demo_10_2');
codePreview('demo_10_2', showDemo102);

function showDemo103(id) {
    function User(name = 'Guest', mail = 'email', url = User.getAvatar()) {
        this.name = name;
        this.mail = mail;
        this.photoURL = url;
    }

    User.avatars = [
        "https://pre00.deviantart.net/50f9/th/pre/i/2011/217/e/8/pikachu_2_by_nostalgiaattack-d45jd3i.png",
        "https://cdn.diversityavatars.com/wp-content/uploads/2018/01/Vector-Smart-Object-5.png",
        "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-31-512.png",
        "http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-L3-icon.png",
        "https://findicons.com/files/icons/1072/face_avatars/300/i05.png",
        "http://www.iconarchive.com/download/i51043/hopstarter/halloween-avatars/Gomez.ico",
        "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/256/Zombie-2-icon.png",
        "https://vignette.wikia.nocookie.net/yogscast/images/8/8a/Avatar_Turps_2015.jpg"
    ]

    User.getAvatar = function() {
        return this.avatars.shift()
    }

    User.admin = {
        photoURL: "https://i.pinimg.com/originals/3d/47/4f/3d474f82ff71595e8081f9a120892ae8.gif",
        name: "admin"
    }

    Object.defineProperty(User.prototype, 'messageBox', (function () {
        const container = document.getElementById(id);
        container.querySelector('textarea').oninput = function (event) {
            event.target.parentNode.querySelector('img').src =  User.admin.photoURL;
            event.target.parentNode.querySelector('span').textContent =  User.admin.name;
        }
        return {
            value: container
        }
    })())

    User.prototype.write = function () {
        this.messageBox.querySelector('textarea').value = `Hi from ${this.name}`;
        this.messageBox.querySelector('img').src =  this.photoURL;
        this.messageBox.querySelector('img').alt =  this.name;
        this.messageBox.querySelector('span').textContent =  this.name
    }

    User.prototype.read = function () {
        console.log(`${this.name} read ${this.messageBox.querySelector('textarea').value}`)
    }


    var users = [
        new User ( "Иван" ),
        new User ( 'Alex', "alex@gmail.com" ),
        new User ( 'Bob', "bob777@gmail.com" ),
        new User ( 'Dima', "dima888@gmail.com" ),
        new User ( 'Fima', "fima999@gmail.com" )
    ]

    var k = 1;
    users.forEach (
        function ( user, index, allUsers ) {
            setTimeout (
                function () {
                    user.write ( `Hello, I'm ${user.name}` )
                }, 3000 * k++
            )
        }
    )
}

showDemo103('demo_10_3')
codePreview('demo_10_3', showDemo103);

// lesson 11

function showDemo111(id) {
    function loadJson ( sourceURL ) {
        return new Promise( function ( resolve, reject ) {
            var request = new XMLHttpRequest ()
            request.onreadystatechange = function () {
                var data = request.responseText
                if ( request.readyState === 4 ) {
                    if ( request.status === 200 )
                        resolve ( data )
                    else reject ( data )
                }
            }
            request.open ( "GET", sourceURL );
            request.send ()
        })
    }

    function getData( url ) {
        loadJson( url )
            .then ( function ( response ) {
                const container = document.getElementById(id);
                JSON.parse(response).forEach( img => {
                    let imgBox = container.appendChild(document.createElement('div'));
                    imgBox.appendChild(document.createElement('img'))
                        .src = img.url;
                    imgBox.appendChild(document.createElement('div'))
                        .textContent = img.title;
                })
            })
            .catch ( function ( err ) { console.log ( err ) })
    }

    getData('images.json')
}

showDemo111('demo_11_1');
codePreview('demo_11_1', showDemo111);

function showDemo112(id) {
    var messages = [
        "backspace",
        "enter",
        "shift",
        "control",
        "delete",
        "space",
        "subtract"
    ]

    messages.getKey = () => {
        var key = new Date().toLocaleString().split(", ")[1]
        return log [ key ] ? log [ key + "[2]" ] ? key + "[3]" : key + "[2]" : key
    }

    var log = {};

    var sendMessage = message => new Promise (
        resolve => setTimeout (
            () => resolve ( message ),
            Math.random () * 7000
        )
    )

    messages.forEach( item => {
        sendMessage( item ).then(message => {
            Object.assign( log, {[messages.getKey()]: message} );
            document.getElementById(id).textContent = log
        })
    })
}

showDemo112('demo_11_2')
codePreview('demo_11_2', showDemo112);

function showDemo113(id) {
    var messages = [
        "backspace",
        "enter",
        "shift",
        "control",
        "delete",
        "space",
        "subtract"
    ]

    messages.getKey = () => new Date().toLocaleString().split(", ")[1];

    var log = {};

    var sendMessage = message => new Promise (
        resolve => setTimeout (
            () => resolve ( message ),
            Math.random () * 7000
        )
    )

    var sendAll = () => {
        var index = 0;
        function recursive () {
            sendMessage( messages[index++] )
                .then(message => {
                    Object.assign( log, {[messages.getKey()]: message} );
                    document.getElementById(id).textContent = log
                })
                .then(() => recursive () )
        }
        recursive ()
    }

    sendAll()
}

showDemo113('demo_11_3');
codePreview('demo_11_3', showDemo113);



