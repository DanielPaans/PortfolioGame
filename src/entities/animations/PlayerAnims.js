export default anims => {

    anims.create({
        key: 'playerMove',
        frames: [
            {key: 'knight-1'},
            {key: 'knight-2'},
            {key: 'knight-3'},
            {key: 'knight-4'},
        ],
        frameRate: 5,
        repeat: -1
    });

    anims.create({
        key: 'playerJump',
        frames: [
            {key: 'knight-6'},
            {key: 'knight-5'},
        ],
        frameRate: 2,
        repeat: 0
    });

    anims.create({
        key: 'playerSlide',
        frames: [
            {key: 'knight-7'},
            {key: 'knight-8'},
        ],
        frameRate: 5,
        repeat: 0
    });

    anims.create({
        key: 'playerDive',
        frames: [
            {key: 'knight-9'},
        ],
        frameRate: 1,
        repeat: 0
    });
}
