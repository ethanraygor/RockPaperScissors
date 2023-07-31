export class HandImage {
    static images = [
        {
            name: 'fist.png',
            image: require('./fist.png'),
        },
        {
            name: 'rock.png',
            image: require('./rock.png'),
        },
        {
            name: 'paper.png',
            image: require('./paper.png'),
        },
        {
            name: 'scissors.png',
            image: require('./scissors.png'),
        }
    ];

    static GetImage = (name) => {
        const found = HandImage.images.find(e => e.name === name);
        return found ? found.image : null;
    };
}