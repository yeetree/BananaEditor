const body = ["../Sprites/body/banana_0.png", "../Sprites/body/banana_1.png", "../Sprites/body/banana_2.png", "../Sprites/body/banana_3.png"]
const shirts = ["../Sprites/blank.png", "../Sprites/shirts/shirts_0.png", "../Sprites/shirts/shirts_1.png", "../Sprites/shirts/shirts_2.png", "../Sprites/shirts/shirts_3.png", "../Sprites/shirts/shirts_4.png", "../Sprites/shirts/shirts_5.png"]
const pants = ["../Sprites/blank.png", "../Sprites/pants/pants_0.png", "../Sprites/pants/pants_1.png", "../Sprites/pants/pants_2.png"]

if(location.href.includes("file://"))
{
    alert("You are attempting to use Banana Editor offline. Please temporarily disable CORS for your browser temporarily for Banana Editor to work properly.");
    alert("Disabling CORS can cause significant security risks. If you do not want that, use the web version.")
}

let app = new PIXI.Application({ width: 500, height: 500 });
app.stage.sortableChildren = true;
document.getElementById("canvas").appendChild(app.view);

let b = document.getElementById("body");
let bc = document.getElementById("bodyColor");
let s = document.getElementById("shirt");
let sc = document.getElementById("shirtColor");
let p = document.getElementById("pants");
let pc = document.getElementById("pantsColor");

let banana = new PIXI.Container();
banana.sortableChildren = true;
let bodySprite = PIXI.Sprite.from(body[parseInt(b.value) - 1]);
let shirtSprite = PIXI.Sprite.from(shirts[parseInt(s.value) - 1]);
let pantsSprite = PIXI.Sprite.from(pants[parseInt(p.value) - 1]);

function update() {
    app.stage.removeChildren();
    banana.removeChildren();

    bodySprite = PIXI.Sprite.from(body[parseInt(b.value) - 1]);
    bodySprite.tint = parseInt(bc.value.replace(/^#/, ''), 16);

    shirtSprite = PIXI.Sprite.from(shirts[parseInt(s.value) - 1]);
    shirtSprite.zIndex = 1;
    shirtSprite.tint = parseInt(sc.value.replace(/^#/, ''), 16);

    pantsSprite = PIXI.Sprite.from(pants[parseInt(p.value) - 1]);
    pantsSprite.tint = parseInt(pc.value.replace(/^#/, ''), 16);

    banana.addChild(bodySprite);
    banana.addChild(shirtSprite);
    banana.addChild(pantsSprite);
    banana.scale.x = .666666;
    banana.scale.y = .666666;
    banana.x = 50;
    banana.y = 50;

    app.stage.addChild(banana);
}

b.onchange = update;
bc.onchange = update;
s.onchange = update;
sc.onchange = update;
p.onchange = update;
pc.onchange = update;

update();

function save()
{
    let sv = [b.value, bc.value, s.value, sc.value, p.value, pc.value]
    let svStr = JSON.stringify(sv);
    let name = prompt("Save *.banana")
    if(name != null)
    {
        downloadFile(name + '.banana', svStr)
    }
}
function downloadFile(name, data) {
    let a = document.createElement("a");
    if (typeof a.download !== "undefined") a.download = name;
    a.href = URL.createObjectURL(new Blob([data], {
        type: "application/octet-stream"
    }));
    a.dispatchEvent(new MouseEvent("click"));
}

function load()
{
    let filecontent = "";
    let sv = [];
    let input = document.createElement("input");
    input.type = "file"
    input.accept = ".banana"
    input.dispatchEvent(new MouseEvent("click"));
    input.addEventListener('change', (event) => {
        reader.readAsText(input.files[0]);
    });
    var reader = new FileReader();
    reader.addEventListener('load', function (e) {
        filecontent = e.target.result;
        loadBanana(filecontent);
    });
}

function loadBanana(filecontent)
{
    sv = JSON.parse(filecontent);
    b.value = sv[0];
    bc.value = sv[1];
    s.value = sv[2];
    sc.value = sv[3];
    p.value = sv[4];
    pc.value = sv[5];
    update();
}