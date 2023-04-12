class Pendulum {
    constructor(color, theta1, theta2, m1 = 0.1, m2 = 0.1, l1 = 100, l2 = 80, PREV_POINT=[0, 0]){
        this.theta1 = theta1;
        this.theta2 = theta2;
        this.m1 = m1;
        this.m2 = m2;
        this.l1 = l1;
        this.l2 = l2;
        this.omega1 = 0;
        this.omega2 = 0;
        this.color = color;
        this.PREV_POINT = PREV_POINT;
    }

    calc_omegap1(g){
        return -(g*(2*this.m1+this.m2)*Math.sin(this.theta1) + this.m2*g*Math.sin(this.theta1-2*this.theta2) + 2*Math.sin(this.theta1-this.theta2)*this.m2*(this.omega2*this.omega2*this.l2 + this.omega1*this.omega1*this.l1*Math.cos(this.theta1-this.theta2)))/(this.l1*(2*this.m1+this.m2-this.m2*Math.cos(2*this.theta1-2*this.theta2)));
    }

    calc_omegap2(g){
        return 2*Math.sin(this.theta1-this.theta2)*(this.omega1*this.omega1*this.l1*(this.m1+this.m2)+g*(this.m1+this.m2)*Math.cos(this.theta1)+this.omega2*this.omega2*this.l2*this.m2*Math.cos(this.theta1-this.theta2))/(this.l1*(2*this.m1+this.m2-this.m2*Math.cos(2*this.theta1-2*this.theta2)));
    }

    draw_pendulum(ctx){
        let HINGE_POINTS = [300, 300];
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(HINGE_POINTS[0], HINGE_POINTS[1]);
        ctx.lineTo(HINGE_POINTS[0] - this.l1*Math.sin(this.theta1), HINGE_POINTS[1] - this.l1*Math.cos(this.theta1));
        ctx.lineTo(HINGE_POINTS[0] - this.l1*Math.sin(this.theta1) - this.l2*Math.sin(this.theta2), HINGE_POINTS[1] - this.l1*Math.cos(this.theta1) - this.l2*Math.cos(this.theta2));
        ctx.fillStyle = `rgba(255,255,255,0.5)`;
        ctx.stroke();
    }

    update_omega(g){
        let omegap1 = this.calc_omegap1(g);
        let omegap2 = this.calc_omegap2(g);
        this.omega1 = this.omega1 + omegap1;
        this.omega2 = this.omega2 + omegap2;
    }

    update_theta(){
        this.theta1 = this.theta1 + this.omega1;
        this.theta2 = this.theta2 + this.omega2;
        if(this.theta1 > Math.PI){
            this.theta1 = this.theta1 - 2*Math.PI;
        }
        if(this.theta1 < -Math.PI){
            this.theta1 = this.theta1 + 2*Math.PI;
        }
        if(this.theta2 > Math.PI){
            this.theta2 = this.theta2 - 2*Math.PI;
        }
        if(this.theta2 < -Math.PI){
            this.theta2 = this.theta2 + 2*Math.PI;
        }
    }
}

function init() {
    canvas1 = document.getElementById("canvas1")
    canvas1.width = window.innerWidth / 2;
    canvas1.height = window.innerHeight;
    canvas2 = document.getElementById("canvas2")
    canvas2.width = window.innerWidth / 2;
    canvas2.height = window.innerHeight;
    g = -0.1;
    let pendulum_list = [];
    const pendulumr = new Pendulum('red', Math.PI / 2,  Math.PI / 2);
    pendulum_list.push(pendulumr);
    const pendulumb = new Pendulum('blue',(Math.PI / 2) + 0.000001,  (Math.PI / 2) + 0.000001);
    pendulum_list.push(pendulumb);
    const pendulumg = new Pendulum('green',(Math.PI / 2) + 0.000002,  (Math.PI / 2));
    pendulum_list.push(pendulumg);
    const pendulumgo = new Pendulum('brown',(Math.PI / 2) - 0.000001,  (Math.PI / 2));
    pendulum_list.push(pendulumgo);
    const pendulumdb = new Pendulum('#00008b',(Math.PI / 2) - 0.000002,  (Math.PI / 2));
    pendulum_list.push(pendulumdb);
    const pendulumv = new Pendulum('violet',(Math.PI / 2) - 0.000002,  (Math.PI / 2));
    pendulum_list.push(pendulumv);
    const pendulumsg = new Pendulum('#93e9be',(Math.PI / 2) - 0.000002,  (Math.PI / 2));
    pendulum_list.push(pendulumsg);
    window.requestAnimationFrame(() => {draw(pendulum_list)});
}

function draw_graph(pendulum, ctx) {

    const GRAPH_TOP = 200;
    const GRAPH_BOTTOM = 700;
    const GRAPH_LEFT = 150;
    const GRAPH_RIGHT = 650;
    const GRAPH_WIDTH = GRAPH_RIGHT - GRAPH_LEFT;
    const GRAPH_HEIGHT = GRAPH_BOTTOM - GRAPH_TOP;

    ctx.fillRect(GRAPH_LEFT, GRAPH_TOP, GRAPH_WIDTH, GRAPH_HEIGHT);

    ctx.beginPath();

    // Graph barebone
    ctx.moveTo(GRAPH_LEFT, GRAPH_TOP);
    ctx.lineTo(GRAPH_LEFT,GRAPH_BOTTOM);
    ctx.lineTo(GRAPH_RIGHT,GRAPH_BOTTOM);
    ctx.lineTo(GRAPH_RIGHT,GRAPH_TOP);
    ctx.lineTo(GRAPH_LEFT,GRAPH_TOP);

    //Axes
    ctx.font = "17px Arial";
    ctx.strokeStyle = 'black';
    ctx.fillText("Theta 1", GRAPH_LEFT - 100, (GRAPH_TOP+GRAPH_BOTTOM)/2);
    ctx.fillText("π", GRAPH_LEFT - 20, GRAPH_TOP + 20);
    ctx.fillText("π/2", GRAPH_LEFT - 30, GRAPH_TOP+GRAPH_HEIGHT*0.25);
    ctx.fillText("0", GRAPH_LEFT - 20, (GRAPH_TOP+GRAPH_BOTTOM)/2);
    ctx.fillText("-π/2", GRAPH_LEFT - 35, GRAPH_TOP+GRAPH_HEIGHT*0.75);
    ctx.fillText("-π", GRAPH_LEFT - 20, GRAPH_BOTTOM + 20);
    ctx.fillText("Theta 2", (GRAPH_LEFT+GRAPH_RIGHT)/2, GRAPH_BOTTOM + 50);
    ctx.fillText("-π/2", GRAPH_LEFT+GRAPH_WIDTH*0.25, GRAPH_BOTTOM + 20);
    ctx.fillText("0", (GRAPH_LEFT+GRAPH_RIGHT)/2, GRAPH_BOTTOM + 20);
    ctx.fillText("-π/2", GRAPH_LEFT+GRAPH_WIDTH*0.75, GRAPH_BOTTOM + 20);
    ctx.fillText("π", GRAPH_RIGHT - 20, GRAPH_BOTTOM + 20);
    ctx.stroke();

    // Graph fill
    const ORIGIN = [GRAPH_LEFT, GRAPH_BOTTOM]
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = pendulum.color;
    let theta1 = pendulum.theta1 + Math.PI;
    let theta2 = pendulum.theta2 + Math.PI;
    if(theta1>Math.PI){
        theta1 = theta1 - 2*Math.PI;
    }
    if(theta1<-Math.PI){
        theta1 = theta1 + 2*Math.PI;
    }
    if(theta2>Math.PI){
        theta2 = theta2 - 2*Math.PI;
    }
    if(theta2<-Math.PI){
        theta2 = theta2 + 2*Math.PI;
    }
    NEW_POINT = [ORIGIN[0] + ((theta2)/(2*Math.PI)+0.5)*GRAPH_WIDTH, ORIGIN[1] - ((theta1)/(2*Math.PI)+0.5)*GRAPH_HEIGHT];
    if (pendulum.PREV_POINT[0] == 0){
        pendulum.PREV_POINT = NEW_POINT;
    }
    ctx.moveTo(pendulum.PREV_POINT[0], pendulum.PREV_POINT[1])
    ctx.lineTo(NEW_POINT[0], NEW_POINT[1]);
    if(Math.abs(pendulum.PREV_POINT[0]-NEW_POINT[0])<10 && Math.abs(pendulum.PREV_POINT[1]-NEW_POINT[1])<10){
        ctx.fillStyle = `rgba(255, 255, 255, 0.002)`;
        ctx.stroke();
    }
    pendulum.PREV_POINT = NEW_POINT;
}

function draw(pendulum_list) {
    const ctx1 = document.getElementById("canvas1").getContext("2d");
    const ctx2 = document.getElementById("canvas2").getContext("2d");

    ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
    ctx1.lineWidth = 3;

    pendulum_list.map(pendulum => {
        pendulum.draw_pendulum(ctx1);
    });

    pendulum_list.map(pendulum => {
        pendulum.update_omega(g);
    });

    pendulum_list.map(pendulum => {
        pendulum.update_theta();
    });

    pendulum_list.map(pendulum => {
        draw_graph(pendulum, ctx2);
    });

    window.requestAnimationFrame(() => {draw(pendulum_list)});
}

init();