var messageArea;
var st="";
//function onLoadFile() {

    //var getFile = document.getElementById("fileUpload");
    
    // 利用檔案陣列長度與檔案類型，來判斷是否有上傳檔案且類型為文字檔
    //if(getFile.files.length != 0 && getFile.files[0].type.match(/text.*/)) {
    
        //var reader = new FileReader();
    
        //reader.onload = function(e) {
    
            //messageArea = document.getElementById("mset");
            // 將文字檔內容置入textarea
            //messageArea.value = e.target.result;
    
        //};
    
        //reader.onerror = function(e) {
    
            //console.log("無法讀取文字檔!");
    
        //}
    
        // 讀取文字檔案，第二個參數預設是UTF-8
        //reader.readAsText(getFile.files[0], "ISO-8859-1");
        //reader.readAsText(getFile.files[0]);
    
    //} else {
    
        //console.log("上傳的檔案非文字檔!");
    
    //}
//
//}
var st = 'AAATTTCCCGGB,' +
         'TTTAAACCCGGD,' +
         'GGGTTTAAACCS,' +
         'TACGTACGBACG,' +
         'ATCGATCGATCG,' +
         'AAAAAAGGGGGG,' +
         'TTTTTTAAAAAA,' +
         'TACGATCGATCG,' +
         'GTACTAGCTAGC,' +
         'CTAGCTAGCTAG,' +
         'TCGATCGATCGA,' +
         'GATCGATCGATC,' +
         'CATGCTAGCTAG,' +
         'AKJSHCUWUAKC,' +
         'AGGTGGCTAGGB,' +
         'GGGTGGCAAAAN,' +
         'CGGTGGCGAAAF,' +
         'CGGTGGCAAAAB,' +
         'GGATGGCGACAF,' +
         'GTACTAGCTAGC,' +
         'CTAGCTAGCTAG,' +
         'TCGATCGATCGA,' +
         'GATCGATCGATC,' +
         'CATGCTAGCTAG,' +
         'AKJSHCUWUAKC,' +
         'GGGTGGCAAAAD';
  
  document.getElementById("mset").innerHTML = st.replace(/,/g, '\n');
  //Input text
  //var tmp = matrix(c);
  //logo(tmp[0],tmp[1]);

var sq = 0;  // position
var li = 3;	 // axis line
var bo = 28; // bottom font size
var lo = 540;// letter size

//document.getElementById("mset").innerHTML = c.replace(/,/g, '\n');*/
var tmp;  
tmp = matrix(st);
logo(tmp[0],tmp[1]);

function exportCanvasAsPNG(id, fileName) {

    var canvasElement = document.getElementById(id);

    var MIME_TYPE = "image/png";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}


function matrix(st){

var s = [];
var m = [];

m = st.split(',');
var n = m.length;

//THE ALIGNMENT MATRIX
for(var i=0; i<n; i++){
    s[i] = [];
    s[i]=m[i].split('');
}

//DETECT ALL LETTERS USING ARRAYS
var a = [];

var t = st.replace(/,/g, '').split('');
var k = t.length;

for(var i=0; i<=k; i++){
    var q = 1;
    for(var j=0; j<=a.length; j++){
        if (t[i] === a[j]) {q = 0;}
    }
    if (q === 1) {a.push(t[i]);}
}

// PROFILE MATRIX INITIALIZATION
var p = [];

for(var h=0; h<a.length; h++){
    p[h]=[];
    for(var i=0; i<=s[0].length; i++) {
        p[h][i]=0;
        p[h][0]=a[h];
    }
}

// THE POSITION FREQUENCY MATRIX
for(var i=0; i<s.length; i++) {

    for(var j=0; j<s[i].length; j++){
                
        for(var h=0; h<a.length; h++){
        
            if (s[i][j] === a[h]) {p[h][j+1]++;}
        }
    }
}

// THE POSITION PROBABILITY MATRIX
var max = 0;
for(var i=0; i<p.length; i++) {
    for(var j=0; j<p[i].length-1; j++){
    
        p[i][j+1]=p[i][j+1]/s.length;
        p[i][j+1]=p[i][j+1].toFixed(2);
        
        if(max<=p[i][j+1]){max=p[i][j+1];}
        
        p[i][j+1]+='|'+p[i][0] 
    }
}

return [p, max];
}


function logo(M, max) {

//MAKE LOGO
var a = [];
var t = M[0].length;

var canvas = document.getElementById('bio');
var canvasl = document.getElementById('letter');
var ctl = canvasl.getContext('2d');

var w = canvas.width - 80;
var h = canvas.height - 40;

var wl = canvasl.width;
var hl = canvasl.height;

if (canvas.getContext) {

    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w+80, h+40);

    for(var j=1; j<t; j++){
    
        //ORDER VALUES ON EACH COLUMN
        for(var k=0; k<M.length; k++){
            a[k]=[];
            a[k][0] = M[k][j].split('|')[0];
            a[k][1] = M[k][j].split('|')[1];
        }

        a = iSort(a);
        
        for(var k=0; k<M.length; k++){
            M[k][j] = a[k][0] + '|' + a[k][1];
        }

        // LOGO
        var iw = (w/(t-1))-1;
        var x = 80+(j-1)*iw;
        
        for (var u=0; u<a.length; u++)
        {
            ctl.imageSmoothingQuality = 'high';
            ctl.clearRect(0, 0, wl, hl);
            ctl.font = 'bold ' + lo + 'px Arial';
            
            var cl = 'gray';
            if(a[u][1]=='G'){cl='#fcaf07';}
            if(a[u][1]=='T'){cl='#d50000';}
            if(a[u][1]=='A'){cl='#07d607';}
            if(a[u][1]=='C'){cl='#0909c8';}
            
            ctl.fillStyle = cl;
            
            var ltr = ctl.measureText(a[u][1]).width;
            ctl.fillText(a[u][1], (wl/2)-(ltr/2), hl-5);
            
            var y = h-(h/max)*a[u][0];
            
            if(u>0){var ih = h-((h/max)*a[u-1][0])-y;}
            if(u==0){var ih = h-y;}

            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(canvasl, x, y, iw, ih);
        }
    }
    
    //AXIS
    if(t>=2){
    
        ctx.lineWidth = li;
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = '#454545';

        for (var i=1; i<t; i++)
        {
            if(document.getElementById("show_bottom_divisions").checked) {
                ctx.moveTo(80+Math.floor(iw*i), h+4);
                ctx.lineTo(80+Math.floor(iw*i), h+20);
            }
            
            ctx.font = bo + 'px Arial';
            var txt = Number(i)+Number(sq);
            var ltr = ctx.measureText(txt).width;
            ctx.fillText(txt, (iw/2)-(ltr/2)+80+(i-1)*iw, h+40);
        }
        ctx.stroke();
        
        
        ctx.moveTo(60, h+4);
        if(document.getElementById("show_bottom").checked) {
            //bottom line
            ctx.lineTo(80+Math.floor(iw*(t-1)), h+4);
        } else {
            ctx.lineTo(75, h+4);
        }
        ctx.stroke();
        
        //left vertical line
        ctx.moveTo((75), 4);
        ctx.lineTo((75), h+40);
        ctx.stroke();

        //vertical divisions
        for (var i=0; i<10; i++)
        {
            var fi = 65;
            if(i==0){fi = 0}
            ctx.moveTo(75, 4+(Math.floor((h+4)/10)*i));
            ctx.lineTo(fi, 4+(Math.floor((h+4)/10)*i));
        }
        ctx.stroke();
        
        //MAX text
        text = 'Max';
        dim = ctx.measureText(text).width
        ctx.save();
        ctx.translate(0,32);
        ctx.font = "30px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";
        ctx.fillText(text, 0, 0);
        ctx.restore();
        
        text = '0';
        dim = ctx.measureText(text).width
        ctx.save();
        ctx.translate(40,h+15);
        ctx.font = "30px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";
        ctx.fillText(text, 0, 0);
        ctx.restore();
    }
    
}
}

//SORT
function iSort(a) {
var n = a.length;
for (var i = 1; i < n; i++) {
    let n = a[i][0];
    let j = i-1;
    
    while ((j > -1) && (n < a[j][0])) {
    
        a[j+1][0] = a[j][0];
        
        var t = a[j+1][1];
        a[j+1][1] = a[j][1];
        a[j][1]=t;
        j--;
    }
    a[j+1][0] = n;
}
return a;
}


