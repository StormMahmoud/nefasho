//Nameer's code
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 720

const gravity = .7

//Player class
class Player{
	constructor() {
		this.width = 57
		this.height = 102
		this.jumpHeight = 20
		this.movementSpeed = 10
		this.num_jumps =1
		this.pos = {
			x: 300,
			y: canvas.height - 169 - this.height
		}
		this.velocity ={
			x: 0,
			y: 1 
		}
		this.frames = 0
		this.sprites = {
			idle: {
				right: newImage('./imgs/Sprites/idle_right_sprite_sheet.png'),
				left: newImage('./imgs/Sprites/idle_left_sprite_sheet.png'),
				cropWidth: 19,
				width: 57
			},
			run: {
				right: newImage('./imgs/Sprites/run_right_sprite_sheet.png'),
				left: newImage('./imgs/Sprites/run_left_sprite_sheet.png'),
				cropWidth:21,
				width: 63
			}
		}

		this.currentSprite = this.sprites.idle.right
		this.currentCropWidth = this.sprites.idle.cropWidth
	}


	//Draws the player to the canvas
	draw(){
		context.drawImage(
		this.currentSprite, this.currentCropWidth*this.frames,
		0, this.currentCropWidth, 34, this.pos.x, 
		this.pos.y, this.width, this.height)
	} 

	//updates the players position and appearence
	update(){
		player.frames++
		if (player.frames >=12&& (player.currentSprite == player.sprites.idle.right 
			|| player.currentSprite == player.sprites.idle.left)) player.frames = 0
		else if(player.frames >= 8 && (player.currentSprite == player.sprites.run.right
		 	|| player.currentSprite == player.sprites.run.left)) player.frames = 0
		this.draw()
		this.pos.y += this.velocity.y
		if((this.pos.y + this.height)<=canvas.height){
			this.velocity.y += gravity
		}
		else{
			this.velocity.y = 0 
			this.pos.y = canvas.height - this.height
			this.num_jumps = 1
		}

		this.pos.x += this.velocity.x
	}
}

class Platform{
	constructor({x, y, width, height, image}){
		this.pos={
			x,
			y
		}
		this.width = width
		this.height = height
		this.image = image
	}

	draw(){
		context.drawImage(this.image, this.pos.x, 
		this.pos.y, this.width, this.height)
	}
}

class BackgroundObjects{
	constructor({x, y, width, height, image}){
		this.pos={
			x,
			y
		}
		this.width = width
		this.height = height
		this.image = image
	}
	draw(){
		context.drawImage(this.image, this.pos.x, 
		this.pos.y, this.width, this.height)
	}
}


class InfoSign{
	constructor(x, y, textLine_1, textLine_2, textLine_3, textLine_4, textLine_5){

		this.width = 62
		this.height = 68
		this.text_1 =textLine_1	
		this.text_2 =textLine_2
		this.text_3 =textLine_3	
		this.text_4 =textLine_4	
		this.text_5 =textLine_5	
		this.pos ={
			x,
			y: y-this.height
		}
		this.image = newImage('./imgs/info_sign.png')
	}
	read(){
		context.fillText(this.text_1,this.pos.x, this.pos.y -100)
		context.fillText(this.text_2,this.pos.x, this.pos.y -80)
		context.fillText(this.text_3,this.pos.x, this.pos.y -60)
		context.fillText(this.text_4,this.pos.x, this.pos.y -40)
		context.fillText(this.text_5,this.pos.x, this.pos.y - 20)
	}
	draw(){
		context.font = "20px sans-serif"
		context.drawImage(this.image, this.pos.x, 
		this.pos.y, this.width, this.height,)
	}
}

class Collectible{
	constructor({x, y}){
		this.pos = {
			x,
			y
		}
		this.width = 60
		this.height = 57
		this.image = newImage('./cigarette_collectible.png')
	}
	draw(){
		context.drawImage(this.image, this.pos.x, this.pos.y)
	}
}


let numCigarettes = 0

function newImage(imgSrc){
	img = new Image()
	img.src = imgSrc
	return img
} 

const groundImage = newImage('./imgs/ground.png')
const bgImage_1 = newImage('./imgs/jungle_asset_pack/backgrounds/plx-1.png')
const bgImage_2 = newImage('./imgs/jungle_asset_pack/backgrounds/plx-2.png')
const bgImage_3 = newImage('./imgs/jungle_asset_pack/backgrounds/plx-3.png')
const bgImage_4 = newImage('./imgs/jungle_asset_pack/backgrounds/plx-4.png')
const bgImage_5 = newImage('./imgs/jungle_asset_pack/backgrounds/plx-5.png')
const infoSign_1 = new InfoSign(300,655, 'Welcome to the Amazon Rainforest, the worlds largest and most biodiverse rainforest.', 'Home to an estimated 390 billion trees this beautiful forest and many like it is suffering from deforestation.', 'This issue is incredibly serious and has devestating effects on the wildlife, enviroment, and land.', 'Your job is to locate the causes of deforestation and eliminate them,', 'then you will have to combat its effects in an effort to reduce them')
const infoSigns =[infoSign_1]
let signNear = infoSign_1
let isNearSign = false
const player = new Player()


//array containing all background images
const backgrounds = [new BackgroundObjects({
	x:0,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_1
}),
new BackgroundObjects({
	x:0,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_2
}),
new BackgroundObjects({
	x:0,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_3
}),
new BackgroundObjects({
	x:0,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_4
}),
new BackgroundObjects({
	x:0,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_5
}),
new BackgroundObjects({
	x:1278,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_1
}),
new BackgroundObjects({
	x:1278,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_2
}),
new BackgroundObjects({
	x:1278,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_3
}),
new BackgroundObjects({
	x:1278,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_4
}),
new BackgroundObjects({
	x:1278,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_5
}),
new BackgroundObjects({
	x:-1280,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_1
}),
new BackgroundObjects({
	x:-1280,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_2
}),
new BackgroundObjects({
	x:-1280,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_3
}),
new BackgroundObjects({
	x:-1280,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_4
}),
new BackgroundObjects({
	x:-1280,
	y:0,
	width: 1280,
	height: 720,
	image: bgImage_5
})]



//array containing all platforms within level
const platforms = [new Platform({
	x: 0, 
	y: 650, 
	width: 644, 
	height: 124, 
	image: groundImage}),
new Platform({
	x: 639, 
	y: 650, 
	width: 644, 
	height: 124, 
	image: groundImage}),
new Platform({
	x: 1278, 
	y: 650, 
	width: 644, 
	height: 124, 
	image: groundImage}),
new Platform({
	x: 1917, 
	y: 650, 
	width: 644, 
	height: 124, 
	image: groundImage}),
new Platform({
	x: 2556, 
	y: 650, 
	width: 644, 
	height: 124, 
	image: groundImage}),
new Platform({
	x: 3195, 
	y: 650, 
	width: 644, 
	height: 124, 
	image: groundImage}),]

const collectibles = [new Collectible({
	x: 500,
	y: 570
}),
new Collectible({
	x: 600,
	y: 570
}),
new Collectible({
	x:700,
	y: 570
})]
let lastKey =''
const keys = {
	w:{
		pressed:false
	},
	d: {
		pressed:false
	}, 
	a: {
		pressed: false
	},
	e:{
		pressed:false
	}
}


//redraws everything to the canvas before every frame update
function animate(){
	requestAnimationFrame(animate)
	context.fillStyle="white"
	context.fillRect(0, 0, canvas.width, canvas.height)


	backgrounds.forEach(background => {
		if(background.image == bgImage_1) {
			background.draw()
		}
	})
	backgrounds.forEach(background => {
		if(background.image == bgImage_2) {
			background.draw()
		}
	})	
	backgrounds.forEach(background => {
		if(background.image == bgImage_3) {
			background.draw()
		}
	})	
	backgrounds.forEach(background => {
		if(background.image == bgImage_4){
			background.draw()
		}
	})
	backgrounds.forEach(background => {
		if(background.image == bgImage_5) {
			background.draw()
		}
	})

	infoSigns.forEach(sign =>{
		sign.draw()
	})

	platforms.forEach(platform => {
		platform.draw()
	})

	collectibles.forEach(collectible => {
		collectible.draw()
	})

	player.update()
	context.fillText(numCigarettes, 10,20)

	//horizontal movement
	if(keys.d.pressed && player.pos.x + player.width <= 400){
		player.velocity.x = player.movementSpeed 
	}
	else if(keys.a.pressed && player.pos.x >= 200){
		player.velocity.x = -player.movementSpeed
	}
	else{
		player.velocity.x = 0

		if(keys.d.pressed){
			platforms.forEach(platform => {
				platform.pos.x -= player.movementSpeed
			})
			infoSigns.forEach(sign => {
				sign.pos.x -= player.movementSpeed
			})
			backgrounds.forEach(background => {
				switch(background.image){
					case bgImage_2:
						background.pos.x -=1
						break
					
					case bgImage_3:
						background.pos.x -= 2
						break
					
					case bgImage_4:
						background.pos.x -=3
						break
					
					case bgImage_5:
						background.pos.x -=4
						break
					
					default:
						break	
				}
			})

			collectibles.forEach(collectible => {
				collectible.pos.x -= player.movementSpeed
			})
		}
		else if(keys.a.pressed){
			platforms.forEach(platform => {
				platform.pos.x += player.movementSpeed
			})
			infoSigns.forEach(sign => {
				sign.pos.x += player.movementSpeed
			})
			backgrounds.forEach(background => {
				switch(background.image){
					case bgImage_2:
						background.pos.x +=1
						break
					
					case bgImage_3:
						background.pos.x += 2
						break
					
					case bgImage_4:
						background.pos.x +=3
						break
					
					case bgImage_5:
						background.pos.x +=4
						break
					
					default:
						break	
				}
			})
			collectibles.forEach(collectible => {
				collectible.pos.x += player.movementSpeed
			})
		}
	}
	//top of platform collision detection
	platforms.forEach(platform => {
	if(player.pos.y + player.height <= platform.pos.y && 
		player.pos.y + player.height +player.velocity.y >= platform.pos.y &&
		player.pos.x + player.width >= platform.pos.x &&
		player.pos.x <= platform.pos.x + platform.width)
	{
		player.velocity.y = 0
		player.num_jumps = 1
	}
	})

	collectibles.forEach(collectible => {
		if(player.pos.x >collectible.pos.x && player.pos.x < collectible.pos.x+collectible.width
		&& player.pos.y < collectible.pos.y && player.pos.y > collectible.pos.y - collectible.height){
			collectibles.splice(collectibles.indexOf(collectible), 1)
			numCigarettes++
		}	
	})

	//sign detection
	infoSigns.forEach(sign =>{
		if(player.pos.x<=sign.pos.x + 30
		&& player.pos.x >= sign.pos.x -30
		&& player.pos.y <=sign.pos.y + 45 
		&& player.pos.y >= sign.pos.y -45){
			isNearSign =true
		}
		else{
			isNearSign = false
		}
		signNear = sign
	})

	if(keys.d.pressed && lastKey === 'd' && player.currentSprite != player.sprites.run.right){
		player.frames = 0
 		player.currentSprite = player.sprites.run.right
 		player.currentCropWidth = player.sprites.run.cropWidth
 		player.width = player.sprites.run.width
	}
	else if(keys.a.pressed && lastKey ==='a' && player.currentSprite != player.sprites.run.left){
		player.frames = 0
		player.currentSprite = player.sprites.run.left
 		player.currentCropWidth = player.sprites.run.cropWidth
 		player.width = player.sprites.run.width		
	}
	else if(!keys.a.pressed && lastKey ==='a' && player.currentSprite != player.sprites.idle.left){
		player.frames = 0
		player.currentSprite = player.sprites.idle.left
 		player.currentCropWidth = player.sprites.idle.cropWidth
 		player.width = player.sprites.idle.width		
	}
	else if(!keys.d.pressed && lastKey ==='d' && player.currentSprite != player.sprites.idle.right){
		player.frames = 0
		player.currentSprite = player.sprites.idle.right
 		player.currentCropWidth = player.sprites.idle.cropWidth
 		player.width = player.sprites.idle.width		
	}
	else if(lastKey === 'e'&& isNearSign){
		signNear.read()
	}
}

animate()

//Keyboard input event listeners
addEventListener('keydown', ({keyCode}) => {
	switch (keyCode) {
		// a or left case handler
		case 65:
		keys.a.pressed = true
		lastKey = 'a'
		break

		//w or up event handler
		case 87:
		if(player.num_jumps>0){
			player.velocity.y -= player.jumpHeight
			player.num_jumps -=1
		}
		break

		//s or down event handler
		case 83:
		break
 
		//d or right event handler
 		case 68:
 		keys.d.pressed = true
 		lastKey = 'd'
		break

		case 69:
		keys.e.pressed=true
		lastKey = 'e'
	}
})

addEventListener('keyup', ({keyCode}) => {
	switch (keyCode) {
		// a or left case handler
		case 65:
		keys.a.pressed = false
		break

		//w or up event handler
		case 87:
		break

		//s or down event handler
		case 83:
		break
 
		//d or right event handler
 		case 68:
 		keys.d.pressed = false
		break

		case 69: 
		keys.e.pressed = false
	}
})

