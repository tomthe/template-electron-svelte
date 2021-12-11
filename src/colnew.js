
//////////////////////////////
// Sketch Collage:
// 
// input: some images, collage-ratio;  output: a collage
// input: entweder eine liste für jede eigenschaft: list of ids, list of ratios; oder eine liste mit allem: [{id:4,ratio:1.4},{...}]
//  * imLi=[23,4,24]     raLi=[0.75,1.0,1.5]
// 
// output:
//  * list of elements [{id:4, x:0.0,y:0.55,w:,h,xcrop:ycrop,wcrop:hcrop:,type:'im'},...] 
// 
//////////////////////////////

	let frameColor = [4 , 4, 4];
	let frameWidth = 2;

export class col {
	constructor(idList, ratioList, inputratio){
        this.idList=idList;
        this.inputratio = inputratio;
        this.ratioList= ratioList;


        //options for collage-creation:
        this.nImagesPerCollage=9;
        this.option_maxRatioFit = 7.4;
        this.option_maxrrm = 0.2;

        this.bestpg=[];
        this.bestrrm=190;
        this.bestRatioFit = 140;
        this.besti;

        this.maxTries = 2048;
        this.rrm = 22;


        // global variables:
        this.mainPair;

        //output? object, that defines the positions of every image:
        this.pg =[];
        this.width=1.0;
        this.height=1.0*inputratio;
    }

     getpg(){
        // console.log("colnew getpg:", this.pg)
        return this.pg;
    }

     regenerate (){
        if(this.idList.length>0){
            generate_1_collage_and_save_if_good()
        }
    }
    

    /*
    p.drawHighResolution = function() {
        let hiwidth=3000
        let hiheight = hiwidth * p.height/p.width;
        
        let pg = p.createGraphics(hiwidth, hiheight);
        let rrm = mainPair.draw(p.createVector(0,0),p.createVector(hiwidth,hiheight),true,pg,p);
        //zipPGraphic(pg);
        p.save(pg,'collage.jpg');
    }*/


	start_and_add_pics_to_collage(){
		let ipic =0;
		this.mainPair = new ImPair(this.ratioList[0],this.idList[0]);
		while (ipic <this.idList.length-1) {
            ipic++;
            //console.log("add_pics to collage, ipic:",ipic,this.allimages[this.imList[ipic]].ratioorig,this.imList[ipic]);
            this.mainPair.addPic(this.ratioList[ipic],this.idList[ipic]);
		}
	}

	generate_1_collage_and_save_if_good (){
      let inputratio = this.inputratio;
	//   console.log('generate_1_collage_and save if good.....!',this.idList.length); //, i_pic_in_folder_start, number_of_pics);
      if (this.idList.length <1){
          console.log("no images in this sketch!")
          return;
      }
      
	  let i_tries=0;
	  let i_good=0;

	  let option_maxRatioFit_temp = this.option_maxRatioFit;
	  let option_maxrrm_temp = this.option_maxrrm;

	  let startTime = performance.now();
	  while(i_tries<this.maxTries) {// && i_good < 1){
        // console.log(i_tries,"generate a new try, ")
		i_tries++;
		this.start_and_add_pics_to_collage();
		let ratioFit = this.getRatioFit();
		let perfTimePerCol = (performance.now()- startTime) /i_tries
		if (perfTimePerCol>4){
			//option_maxRatioFit = 1 + perfTimePerCol / 5;
		}
		// console.log("try Number", i_tries,"| rrm: ", this.rrm, '| RatioFit: ', ratioFit, "performance: ", "input-ratio:",this.inputratio,performance.now()-startTime, perfTimePerCol,this.option_maxRatioFit, this.pg);
		if(ratioFit<option_maxRatioFit_temp){
          //pg = 
          this.pg=[];
		  this.rrm = this.mainPair.draw(createVector(0,0),createVector(this.width,this.height),this.pg,this.inputratio);
		  //   console.log("wooo - try Number", i_tries,"| rrm: ", this.rrm, '| RatioFit: ', ratioFit, option_maxRatioFit_temp,option_maxrrm_temp,this.pg);
		  if(this.rrm<this.bestrrm){
			i_good++;
            //p.background(frameColor);
            this.pg=[];
            this.rrm = this.mainPair.draw(createVector(0,0),createVector(inputratio*1.0,1.0),this.pg,this.inputratio);
            this.bestrrm = this.rrm;
            this.bestRatioFit = ratioFit;
            this.bestpg = this.pg;
            this.besti = i_tries;
            //break;
			//save("page" +round(rrm*1000)/1000 + "rf" + round(ratioFit*1000)/1000 +".jpg");
			
			//mainPair.saveToDisk(outputPath + "v1/page" +i_pic_in_folder_start + "rrm"+rrm + "rf" + ratioFit + ".data");
		  } 
		} else{
			//option_maxRatioFit_temp *= 1.01;
			//option_maxrrm_temp *= 1.01;
		}
	  }
      console.log("done!!!" + "; " + i_tries + "; chosen i:", this.besti,"bestrrm:",this.bestrrm," this.bestRatioFit:",this.bestRatioFit,this.bestpg);
      return this.bestpg;
	}

	getRatioFit(){
      let r = this.mainPair.getRatio();
        //   console.log("getratiofit", r)
	  return Math.min(r/this.inputratio, this.inputratio/r);
    //   return (this.inputratio/r);
	}

    
	
	
}

//let p5col = new p5(col, 'c3');

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
        let ri = width / height; //canvas-width
        let rs = this.width / this.height;
        let left, right,top,bottom;
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

    constructor(ratio,imid){
        this.ratio=ratio;
        this.imid=imid;
        this.nIm=1; //anzahl der bilder hier drin und tiefer?
        this.im1;
        this.im2;
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
        if(this.nIm<=2){
            return this.ratio;
        } else {
            if(this.isNebeneinander){
                return this.im1.getRatio() + this.im2.getRatio();
            } else {
                return 1.0/(1.0/this.im1.getRatio() + 1.0/this.im2.getRatio());
            }
        }
    }
    getGoodness(size){
        let ris = Math.round(1.0*size.x/size.y)/1.0;
        //let rdif = round(100*ris/ratio)/100.0;
        let rm = Math.max(ris/this.ratio, this.ratio/ris);
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
 
 
    addPic(ratio,imid){
        this.nIm++;
        //console.log("addPic, ",this.nIm,ratio,imid,this);
        if(this.nIm<=2){  //(Math.random()<0.5){
            return this.addPicReplace(ratio,imid);
        } else {
            if(Math.random(1)<0.5){
              return this.im1.addPic(ratio,imid);
            } else{
              return this.im2.addPic(ratio,imid);
            }
        }
    }
 
    addPicReplace(ratio,imid){
        if(Math.random(1)<0.5){
            this.im1 = new ImPair(this.ratio,this.imid);
            this.im2 = new ImPair(ratio,imid);
        } else {
            this.im1 = new ImPair(ratio,imid);
            this.im2 = new ImPair(this.ratio,this.imid);
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
    draw(pos,size,pg,inputratio){
        let rm=0;
        if(this.nIm==1) {
            let reallyDraw=true;
            if(reallyDraw){
                this.drawImgSmall(pos,size,pg);
                //pg.push({imid:this.imid,pos:pos,size:size});
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
            let ris = size.x/size.y;
            //console.log("inside draw", this.ratio,this.width,this.height,ris,size,pos)
            rm = (Math.max(ris/this.ratio, this.ratio/ris)-1) // (this.width * this.height) * size.x * size.y * 
            rm = size.x * size.y * (Math.max(ris/this.ratio, this.ratio/ris)-1) // (inputratio);
            
        } else {
            if(this.isNebeneinander){
                let pos1 = {x:pos.x,y:pos.y};
                let size1 = {x:size.x * this.getSplit(),y:size.y};
                rm += this.im1.draw(pos1,size1, pg,inputratio);
                let pos2 = {x:pos.x+size.x * this.getSplit(),y:pos.y};
                let size2 = createVector(size.x * (1-this.getSplit()),size.y);
                rm += this.im2.draw(pos2,size2, pg,inputratio);
            } else {
                let pos1 = createVector(pos.x,pos.y,size.x);
                let size1 = createVector(size.x,size.y * this.getSplit());
                rm += this.im1.draw(pos1,size1, pg,inputratio);
                let pos2 = createVector(pos.x,pos.y + size.y * this.getSplit());
                let size2 = createVector(size.x,size.y * (1-this.getSplit()));
                rm += this.im2.draw(pos2,size2, pg,inputratio);
            }
        }
        //console.log("draw.. rm: ", rm)
        return rm;
    }

    
    drawImgSmall(pos, size,pg){
        this.pos = pos;
        this.size = size;
        let ri = size.x/size.y; //r_container
        let rs = this.ratio; //r_filler
        let sleft, sright,stop,sbottom;
        let img = {width: 1.0,height:1.0/this.ratio} //todo: this is a hack
        if(ri > rs){
            //das fenster ist breiter als das bild: obenunten abschneiden
            sleft  = 0; //0.5 * width - 0.5 * width * rs / ri;
            sright = img.width;//0.5 * width + 0.5 * width * rs / ri; //    #0.5 * im1.size[0] * (1+rs/ri)
            stop = 0.5* img.height - 0.5 * img.height * rs/ri;
            sbottom = 0.5* img.height + 0.5 * img.height * rs/ri;
        } else {
            //filler ist breiter als container: seiten abschneiden:.
                sleft = 0.5*img.width - 0.5 * img.width*ri/rs;
                sright = 0.5*img.width + 0.5 * img.width*ri/rs;
                stop = 0;   //    # 0.5*im1.size[1] * (1-ri/rs)
                sbottom = img.height;// 0.5 * height + 0.5 * height * ri/rs ; //     #0.5 * im1.size[0] * (1+ri/rs)
            //das fenster ist schmaler als das anzuzeigende bild: schwarze ränder  oben und unten
        }
        let frameWidth=0;
        if(frameWidth>=1){
            //pg.image(this.img,pos.x+frameWidth,pos.y+frameWidth,size.x-2*frameWidth,size.y-2*frameWidth,sleft,stop,sright-sleft,sbottom-stop);
            
            //image(this.img,pos.x,pos.y,size.x,size.y,sleft,stop,sright-sleft,sbottom-stop);
        } else {
            //image(this.img,pos.x,pos.y,size.x,size.y);
            //pg.image(this.img,pos.x,pos.y,size.x,size.y,sleft,stop,sright-sleft,sbottom-stop); 
            pg.push({imid:this.imid,outerx:pos.x,outery:pos.y,outerw:size.x,outerh:size.y,innerx:sleft,innery:stop,innerw:sright,innerh:sbottom})
        }      
    }
}

function createVector(a,b){
    return {x:a,y:b}
}