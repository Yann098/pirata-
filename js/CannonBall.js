class CannonBall{
    constructor(x,y){
        var opitions={isStatic:true}
        this.r=30;
        this.speed=0.05
        this.image=loadImage("./assets/Cannonball.png")
this.body=Bodies.circle(x,y,this.r,opitions)
this.animation=[this.image]
this.isSink=false
World.add(world,this.body)
    }
   animate(){
    this.speed+=0.05
   }
   remove(index){
    this.isSink=true
    Matter.Body.setVelocity(this.body,{x:0,y:0})
    this.animation=ballAnimation
    this.speed=0.05
    this.r=150
    setTimeout(() => {
        Matter.World.remove(world,this.body)
        delete balls[index]
    }, 1000);
   }
    shoot(){
        var newAngle=cannon.angle-28
        newAngle=newAngle*(3.14/180)

        var velocity=p5.Vector.fromAngle(newAngle)
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false) 
        Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)})
    }

    display(){
        var pos=this.body.position;

        push()
        imageMode(CENTER)
        image(this.image,pos.x,pos.y,this.r,this.r)
        pop()
    }
}