export async function analyzeImageQuality(file: File): Promise<{ isBlurry: boolean; isDark: boolean }> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            // Scale down for faster processing
            const size = 200;
            const ratio = img.width / img.height;
            canvas.width = size;
            canvas.height = size / ratio;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                URL.revokeObjectURL(img.src);
                return resolve({ isBlurry: false, isDark: false }); // Fallback
            }
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            
            let totalBrightness = 0;
            let pixelCount = 0;
            
            const greyscale: number[] = [];
            
            // Calculate brightness and convert to greyscale
            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                
                // standard luminance
                const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                totalBrightness += brightness;
                greyscale.push(brightness);
                pixelCount++;
            }
            
            const avgBrightness = totalBrightness / pixelCount;
            const isDark = avgBrightness < 45; // Threshold for dark image
            
            // Calculate Variance of Laplacian (blur detection)
            // Simplified 3x3 convolution
            const width = canvas.width;
            const height = canvas.height;
            const laplacian: number[] = [];
            
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const i = y * width + x;
                    
                    // Laplacian kernel:
                    // 0  1  0
                    // 1 -4  1
                    // 0  1  0
                    
                    const top = greyscale[i - width];
                    const left = greyscale[i - 1];
                    const center = greyscale[i];
                    const right = greyscale[i + 1];
                    const bottom = greyscale[i + width];
                    
                    const value = top + left + right + bottom - (4 * center);
                    laplacian.push(value);
                }
            }
            
            // Calculate variance
            let sum = 0;
            for (const val of laplacian) sum += val;
            const avg = sum / laplacian.length;
            
            let varianceSum = 0;
            for (const val of laplacian) {
                varianceSum += Math.pow(val - avg, 2);
            }
            const variance = varianceSum / laplacian.length;
            
            // Typical threshold for blur detection using Variance of Laplacian is ~100
            // Since we scaled down aggressively to 200px, it might be lower, so 50 is conservative.
            const isBlurry = variance < 50; 

            URL.revokeObjectURL(img.src);
            resolve({ isBlurry, isDark });
        };
        
        img.onerror = () => {
            URL.revokeObjectURL(img.src);
            resolve({ isBlurry: false, isDark: false }); 
        };
    });
}
