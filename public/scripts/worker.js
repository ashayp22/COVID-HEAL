console.log('Loaded service worker!');

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: "It's for your safety!",
    icon: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbrandimpact.wordpress.com%2F2012%2F08%2F25%2Fin-six-words-some-of-the-best-business-advice-ever%2F&psig=AOvVaw0Z-xPGRJt9Y29x_xeMsaNr&ust=1585440465472000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOD5j5Dwu-gCFQAAAAAdAAAAABAT'
  });
});
