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
}
