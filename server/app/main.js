import { initUpload } from './components/upload.js';
import { initTags } from './components/tags.js';
import { initPublish } from './components/publish.js';

document.addEventListener('DOMContentLoaded', () => {
  initUpload();
  initTags();
  initPublish();
});