import { d_link, storage } from '../firebase'

// #TODO: Move to Helper
function _uploadToStorage(path, imageName) {
    let reference = storage.ref(imageName);         
    let task = reference.putFile(path);            

    return task.then(() => {                                 
        console.log('Photo Uploaded to Storage', path);
    }).catch((e) => {
        Alert.alert('Error!', e)
        console.log('Uploading Image Error: ', e)
    });
}

async function _getGeneratedLink(param, value, _title = 'Bespeak Event', 
    _img = 'https://firebasestorage.googleapis.com/v0/b/bespeak-development.appspot.com/o/system%2Fbespeak-icon.jpg?alt=media&token=c929cf2e-0626-4d8c-a15c-b7231d8d96eb',
    _desc = null) {

    console.log('Creating Link: Title -',  _title, ' Image -', _img);

    const link = await d_link().buildShortLink({
        link: `https://bespeak.page.link/app?${param}=${value}`,
        android: {
            packageName: 'com.jedpedregosa.Bespeak',
            fallbackUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        
        social: {
            title: _title + ' on Bespeak 🐣',
            imageUrl: _img,
            descriptionText: _desc?.substring(0, 60)  + '... 😉 Join this event now on the Bespeak mobile app! 🎉'
        },
        domainUriPrefix: 'https://bespeak.page.link',
    });
    
    console.log('Link Made: ', link)
    return link;
}

export {
    _getGeneratedLink,
    _uploadToStorage
}

