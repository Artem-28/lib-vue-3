import { createApp } from 'vue';
import App from './App.vue';
import useSprite from '@/ui/components/t-icon/sprite/use-sprite';

const app = createApp(App);
app.use(useSprite);

app.mount('#app');
