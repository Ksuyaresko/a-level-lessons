
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
    var collection = ['main', 'section', 'header', 'article'];
    var titles = [1, 2, 3, 4, 5, 6, 7];
    var container = document.getElementById('demo_7_3');
    function over ( event ) {
        event.target.style.backgroundColor = '#ffff0050'
    }
    function out ( event ) {
        event.target.style.backgroundColor = '#ff00ff50'
    }
    function clickHandler ( event ) {
        event.stopPropagation();
        var target = event.target;
        if(!target) return;
        var allChildren = [];
        while(target.children.length) {
            allChildren.push(target.children[0]);
            target = target.children[0]
        }
        var parent =  event.target.parentElement;
        parent.removeChild(event.target);
        for(var el of allChildren) {
            parent.appendChild(el);
            parent = el
        }
    }

    titles.forEach (
        function ( tag, index  ) {
            var el = container.appendChild(document.createElement(collection[index] || 'div'));
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

showDemo73();
codePreview('demo_7_3', showDemo73);