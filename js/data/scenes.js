export const scenes = {
    SC01: {
        title: "Alex's Restful Afternoon",
        description: "Alex lies sprawled on the couch under a soft blanket in the cozy living room, the afternoon sun casting a warm glow. The pug sits nearby, repeatedly squeezing a squeaky toy, the sound echoing softly.",
        objects: [
            { 
                name: "MainCouch",
                type: "couch",
                position: [2, 0, 0],
                rotation: [0, Math.PI / 6, 0],
                size: [2.5, 1, 1]
            },
            {
                name: "FloorLamp",
                type: "lamp",
                position: [4, 0, 0],
                audio: {
                    type: "ambient",
                    src: "lamp_hum.mp3"
                }
            },
            { 
                name: "Alex",
                type: "person",
                position: [2, 0, 0.5],
                rotation: [0, 0, Math.PI / 6]
            },
            { 
                name: "Pug",
                type: "dog",
                position: [3, 0, 0],
                audio: {
                    type: "interaction",
                    src: "squeak.mp3"
                }
            },
            {
                name: "SqueekyToy",
                type: "toy",
                position: [3, 0, 0.1]
            }
        ],
        camera: {
            position: [6, 4, 4],
            lookAt: [2, 0, 0]
        }
    },
    SC02: {
        title: "Jordan's Laughter",
        description: "Jordan sits cross-legged on the rug, laughing at a cartoon on TV. The pug gazes up at him with the squeaky toy in its mouth, tail wagging gently.",
        objects: [
            {
                name: "SideCouch",
                type: "couch",
                position: [-2, 0, -2],
                rotation: [0, Math.PI / 2, 0]
            },
            {
                name: "ReadingLamp",
                type: "lamp",
                position: [-3, 0, -2]
            },
            { 
                name: "Jordan",
                type: "person",
                position: [0, 0, -2],
                rotation: [0, -Math.PI / 4, 0]
            },
            { 
                name: "Pug",
                type: "dog",
                position: [1, 0, -2],
                audio: {
                    type: "interaction",
                    src: "pug_bark.mp3"
                }
            }
        ],
        camera: {
            position: [5, 5, 2],
            lookAt: [0, 0, -2]
        }
    }
};
