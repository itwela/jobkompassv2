I'll create a file helpers document with the video compression commands and instructions:

```markdown:/Users/itwelaibomu/Documents/Github/jobkompassv2/fileHelpers.md
# File Helpers

## Video Compression

### Compress Video to MP4
Navigate to the directory containing your source video and run:
```bash
ffmpeg -i ./sourceVideo.mov -vf "scale=1280:-1" -c:v libx264 -crf 23 -preset medium -movflags +faststart ./public/assets/vids/output.mp4
```

### Convert to WebM
For better web performance:
```bash
ffmpeg -i ./sourceVideo.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -vf "scale=1280:-1" ./public/assets/vids/output.webm
```

### Video Optimization Tips
1. Use MP4 as primary format with WebM as fallback
2. Recommended settings:
   - Resolution: 1280p width (height auto-scaled)
   - CRF: 23 for MP4, 30 for WebM
   - Preset: medium (balance between speed and compression)
3. Always include `movflags +faststart` for faster web playback
4. Create the output directory first:
```bash
mkdir -p public/assets/vids
```

### Example Usage
If compressing `gradient2.mov`:
```bash
cd path/to/video/directory

ffmpeg -i ./gradient2.mov -vf "scale=1280:-1" -c:v libx264 -crf 23 -preset medium -movflags +faststart ./gradient2Compressed.mp4

ffmpeg -i ./amazingRetro.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -vf "scale=1280:-1" ./amazingRetro.webm

```
```
cd Documents/Github/jobkompassv2/public/assets/vids

cd Documents/Github/jobkompassv2/public/assets/vids

ffmpeg -i ./brown-gradient-video.mov -vf "scale=1280:-1" -c:v libx264 -crf 23 -preset medium -movflags +faststart ./brown-gradient-videoCompressed.mp4