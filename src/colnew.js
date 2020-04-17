
//////////////////////////////
// Sketch Collage:
//////////////////////////////

	var frameColor = [4 , 4, 4];
	var frameWidth = 2;

export let col = function(cwidth,cheight) {
	
	//options for collage-creation:
	var nImagesPerCollage=9;
	var option_maxRatioFit = 1.04;
	var option_maxrrm = 0.33;

	var maxTries = 600;
	var rrm = 22;


	// global variables:
	var mainPair;

	var imList = [];

    regenerate = function(){
        if(imList.length>0){
            generate_1_collage_and_save_if_good()
        }
    }
    

    /*
    p.drawHighResolution = function() {
        var hiwidth=3000
        var hiheight = hiwidth * p.height/p.width;
        
        var pg = p.createGraphics(hiwidth, hiheight);
        var rrm = mainPair.draw(p.createVector(0,0),p.createVector(hiwidth,hiheight),true,pg,p);
        //zipPGraphic(pg);
        p.save(pg,'collage.jpg');
    }*/


	function start_and_add_pics_to_collage(){
		var ipic =0;
		mainPair = new ImPair(imList[0],allimages[imList[0]].ratio);
		while (ipic <imList.length-1) {
			ipic++;
            mainPair.addPic(imList[ipic],allimages[imList[ipic]].ratio);
		}
	}

	generate_1_collage_and_save_if_good = function(){
	  console.log('generate_1_collage_and save if good.....!',imList.length); //, i_pic_in_folder_start, number_of_pics);
      if (imList.length <1){
          console.log("no images in this sketch!")
          return;
      }
      
	  var i_tries=0;
	  var i_good=0;

	  var option_maxRatioFit_temp = option_maxRatioFit;
	  var option_maxrrm_temp = option_maxrrm;

	  startTime = performance.now();
	  while(i_tries<maxTries && i_good < 1){
		i_tries++;
		start_and_add_pics_to_collage();
		var ratioFit = getRatioFit();
		var perfTimePerCol = (performance.now()- startTime) /i_tries
		if (perfTimePerCol>4){
			//option_maxRatioFit = 1 + perfTimePerCol / 5;
		}
		console.log("try Number", i_tries,"| rrm: ", rrm, '| RatioFit: ', ratioFit, "performance: ", performance.now()-startTime, perfTimePerCol,option_maxRatioFit);
		if(ratioFit<option_maxRatioFit_temp){
          pg = 
		  rrm = mainPair.draw(createVector(0,0),createVector(width,height),false,p,p);
		  console.log("try Number", i_tries,"| rrm: ", rrm, '| RatioFit: ', ratioFit);
		  if(rrm<option_maxrrm_temp){
			i_good++;
			p.background(frameColor);
			rrm = mainPair.draw(p.createVector(0,0),p.createVector(p.width,p.height),true,p,p);
			//save("page" +round(rrm*1000)/1000 + "rf" + round(ratioFit*1000)/1000 +".jpg");
			
			//mainPair.saveToDisk(outputPath + "v1/page" +i_pic_in_folder_start + "rrm"+rrm + "rf" + ratioFit + ".data");
		  } 
		} else{
			option_maxRatioFit_temp *= 1.01;
			option_maxrrm_temp *= 1.01;
		}
	  }
	  console.log("done!!!" + "; " + i_tries + "; ");
	}

	function getRatioFit(){
	  var r = mainPair.getRatio();
	  return Math.max(r/(p.width/p.height), ((p.width)/p.height)/r);
	}


	
	
}

//var p5col = new p5(col, 'c3');

/*

///////////////////////////////////////////////
// class ColImg
//////////////////////////////////////////////

class ColImg {
	
    constructor( width, height,ima){
        console.log("construct ColImg: ",width, height )
        this.fnSmall = "no small fn";
        this.fnBig = "no big fn";
        this.width = width;
        this.height = height;
        this.img = ima;
        this.imgBig;
    }

    loadSmall(){
        console.log("loadSmall: ", this.fnSmall);
        iSmallImgLoaded +=1;
        this.img = loadImage(this.fnSmall);
    }
    loadSmallCallback(img){
        this.img = img;
    }

    loadBig(){
        this.imgBig = loadImage(this.fnBig, (img) =>{});
    }

    loadBigCallback(imgBig){
        drawImgBig();
    }


    drawImgBig(){
        background(0);
        //console.log( img,fn,mpos, mouseX, mouseY);
        var ri = width / height; //canvas-width
        var rs = this.width / this.height;
        var left, right,top,bottom;
        if(ri > rs){
            //das fenster ist breiter als das bild: räner an den seiten
            left  = 0.5 * width - 0.5 * width * rs / ri;
            right = 0.5 * width + 0.5 * width * rs / ri; //    #0.5 * im1.size[0] * (1+rs/ri)
            top = 0;
            bottom = height;
        } else {
            //orig bild ist höher als der platz in der collage....
                   left = 0;
                   right = width; //width = img.width
                   top = 0.5 * height - 0.5 * height * ri/rs;     //    # 0.5*im1.size[1] * (1-ri/rs)
                   bottom = 0.5 * height + 0.5 * height * ri/rs ; //     #0.5 * im1.size[0] * (1+ri/rs)
            //das fenster ist schmaler als das anzuzeigende bild: schwarze ränder  oben und unten
        }
        if (this.imgBig == null){
            //this.imgBig = await loadImage(this.fnBig);
            image(this.img,left,top,right-left,bottom-top);
            this.imgBig = p.loadImage(this.fnBig, (img)=>{
                this.drawImgBig();
            });
        } else {
            image(this.imgBig,left,top,right-left,bottom-top);
            status = "image"
        }
    } 

    cbdrawImgSmall(img){
        //  this.img = img;
        //this.drawImgSmall(this.pos, this.size);
        //iSmallImgLoaded +=1;
        if(iSmallImgLoaded == nImagesPerCollage){
            //mainPair.draw(createVector(0,0),createVector(width,height),true);
        }
    }


}*/
 
 //////////////////////////////////////////////
 // class imPair
 /////////////////////////////------------------------------

class ImPair {

    constructor(ratio,fn){
        this.ratio=ratio;
        this.fn=fn;
    }
    /*
    constructor(im, fn){
        //console.log("contructor ImPair, fn:",fn,"| im:",im);
        this.strPosInfo="";
        this.isNebeneinander=false;
        this.img = im;
        this.filename = fn;
        this.nIm = 1;
        this.ratio = im.width/im.height;
        this.split=1.0;
    }
    constructor_empty(){
        this.im1;
        this.im2;
        this.img;
        this.filename="";
        this.strPosInfo="";
        this.nIm=0;
        this.isNebeneinander=false;
        this.ratio = 1.0;
        this.split = 0.5;
    }
    constructorR(r){
        this.ratio = r;
    }
    */
 
 
    getRatio(){
        if(this.nIm==1){
            return Math.round(this.img.width)/this.img.height;
        } else {
            if(this.isNebeneinander){
                return this.im1.getRatio() + this.im2.getRatio();
            } else {
                return 1.0/(1.0/this.im1.getRatio() + 1.0/this.im2.getRatio());
            }
        }
    }
    getGoodness(size){
        var ris = Math.round(100*size.x/size.y)/100.0;
        //var rdif = round(100*ris/ratio)/100.0;
        var rm = Math.max(ris/this.ratio, this.ratio/ris);
        return rm;
    }
 
    getSplit(){
        if (this.nIm>1){
            if(this.isNebeneinander){
                return this.im1.ratio/(this.im1.ratio+this.im2.ratio);
            } else {
                return this.im2.ratio/(this.im1.ratio + this.im2.ratio);
            }
        } else {
            return 1.0;
        }
    }
 
 
    addPic(ratio,fn){
        this.nIm++;
        if(this.nIm<=2){  //(Math.random()<0.5){
            return this.addPicReplace(ratio,fn);
        } else {
            if(Math.random(1)<0.5){
            return this.im1.addPic(ratio,fn);
            } else{
            return this.im2.addPic(ratio,fn);
            }
        }
    }
 
    addPicReplace(ratio){
        if(Math.random(1)<0.5){
            this.im1 = new ImPair(this.ratio,this.fn);
            this.im2 = new ImPair(ratio,fn);
        } else {
            this.im1 = new ImPair(ratio,fn);
            this.im2 = new ImPair(this.ratio,this.fn);
        }

        if(Math.random(1)<0.5){
            this.isNebeneinander=false;
        } else {
            this.isNebeneinander=true;
        }
        this.ratio = this.getRatio();
        return 1.0;
    }

 
    //draw(pos, size, reallyDraw, pg, p, getImgAtPosition, mpos,positionCallback){
    draw(pos,size,pg){
        var rm=0;
        if(this.nIm==1) {
            let reallyDraw=true;
            if(reallyDraw){
                this.drawImgSmall(pos,size,pg);
                //pg.push({fn:this.fn,pos:pos,size:size});
            }
            /*
            if(getImgAtPosition){
                if(mpos.x > pos.x && mpos.x < pos.x + size.x){
                    if (mpos.y > pos.y && mpos.y < pos.y + size.y){
                        //treffer!
                        console.log("getImgAtPosition!!! Treffer! ",reallyDraw,pos, this.filename,getImgAtPosition, mpos);
                        positionCallback(this.img,this.filename,mpos);
                    }
                }
            }*/
            // this.strPosInfo += "\n " + pos.x + "; " + pos.y + "; " + size.x + "; "+ size.y + "; " + this.filename;
            var ris = size.x/size.y;
            rm = size.x * size.y * (Math.max(ris/this.ratio, this.ratio/ris)-1) / (pg.width * pg.height);

        } else {
            if(this.isNebeneinander){
                var pos1 = {x:pos.x,y:pos.y};
                var size1 = {x:size.x * this.getSplit(),y:size.y};
                rm += this.im1.draw(pos1,size1,reallyDraw, pg, p, getImgAtPosition, mpos,positionCallback);
                var pos2 = {x:pos.x+size.x * this.getSplit(),y:pos.y};
                var size2 = createVector(size.x * (1-this.getSplit()),size.y);
                rm += this.im2.draw(pos2,size2,reallyDraw, pg, p, getImgAtPosition, mpos,positionCallback);
            } else {
                var pos1 = createVector(pos.x,pos.y,size.x);
                var size1 = createVector(size.x,size.y * this.getSplit());
                rm += this.im1.draw(pos1,size1,reallyDraw, pg, p, getImgAtPosition, mpos,positionCallback);
                var pos2 = createVector(pos.x,pos.y + size.y * this.getSplit());
                var size2 = createVector(size.x,size.y * (1-this.getSplit()));
                rm += this.im2.draw(pos2,size2,reallyDraw, pg, p, getImgAtPosition, mpos,positionCallback);
            }
        }
        return rm;
    }

    
    drawImgSmall(pos, size,pg){
        this.pos = pos;
        this.size = size;
        var ri = size.x/size.y; //r_container
        var rs = this.img.width / this.img.height; //r_filler
        var sleft, sright,stop,sbottom;
        if(ri > rs){
            //das fenster ist breiter als das bild: obenunten abschneiden
            sleft  = 0; //0.5 * width - 0.5 * width * rs / ri;
            sright = this.img.width;//0.5 * width + 0.5 * width * rs / ri; //    #0.5 * im1.size[0] * (1+rs/ri)
            stop = 0.5* this.img.height - 0.5 * this.img.height * rs/ri;
            sbottom = 0.5* this.img.height + 0.5 * this.img.height * rs/ri;
        } else {
            //filler ist breiter als container: seiten abschneiden:.
                sleft = 0.5*this.img.width - 0.5 * this.img.width*ri/rs;
                sright = 0.5*this.img.width + 0.5 * this.img.width*ri/rs;
                stop = 0;   //    # 0.5*im1.size[1] * (1-ri/rs)
                sbottom = this.img.height;// 0.5 * height + 0.5 * height * ri/rs ; //     #0.5 * im1.size[0] * (1+ri/rs)
            //das fenster ist schmaler als das anzuzeigende bild: schwarze ränder  oben und unten
        }
        let frameWidth=0;
        if(frameWidth>=1){
            //pg.image(this.img,pos.x+frameWidth,pos.y+frameWidth,size.x-2*frameWidth,size.y-2*frameWidth,sleft,stop,sright-sleft,sbottom-stop);
            
            //image(this.img,pos.x,pos.y,size.x,size.y,sleft,stop,sright-sleft,sbottom-stop);
        } else {
            //image(this.img,pos.x,pos.y,size.x,size.y);
            //pg.image(this.img,pos.x,pos.y,size.x,size.y,sleft,stop,sright-sleft,sbottom-stop); 
            pg.push({fn:this.fn,outerx:pos.x,outery:pos.y,outerw:size.x,outerh:size.y,innerx:sleft,innery:stop,innerw:sright,innerh:sbottom})
        }      
    }
}

function createVector(a,b){
    return {x:a,y:b}
}