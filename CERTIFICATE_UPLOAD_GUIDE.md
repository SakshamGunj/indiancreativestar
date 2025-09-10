# Certificate Upload Guide - Sikkim Creative Star

## 🚀 How to Upload Certificates - Step by Step Instructions

### Prerequisites

**Before starting, ensure:**
✅ Certificate files are named: `1.jpg, 2.jpg, 3.jpg, ... 49.jpg`  
✅ Files are located in: `/Users/sakshamgunj/Downloads/(Bulk 1) Add a heading (1) 2`  
✅ All 49 certificate files are present  
✅ Cloudinary and Firebase credentials are configured  

---

## Method 1: Web Admin Interface (Recommended)

### Step 1: Access Admin Panel
1. Open your web application
2. Navigate to the admin certificates page
3. Look for the "Certificate Manager" section

### Step 2: Prepare Certificates
1. Ensure certificate files are properly named (1.jpg, 2.jpg, etc.)
2. Verify they're in the correct folder: `/Users/sakshamgunj/Downloads/(Bulk 1) Add a heading (1) 2`

### Step 3: Upload Process
1. Click "Download Serial List" first to verify participant order
2. Use the file picker to select all certificate files
3. Click "Upload Certificates" button
4. Monitor the progress bar
5. Wait for completion message

---

## Method 2: Node.js Terminal Script

### Step 1: Open Terminal
```bash
cd /Users/sakshamgunj/Documents/indiancreativestar
```

### Step 2: Run Upload Script
```bash
node certificate-uploader-node.js
```

**Note**: The script has been updated to use ES modules (compatible with your project's configuration).

### Step 3: Monitor Progress
- Script automatically reads from the folder
- Uploads each certificate to Cloudinary
- Updates Firebase with certificate URLs
- Shows progress in terminal

---

## Method 3: Browser Console Script

### Step 1: Open Browser Developer Tools
1. Go to your admin page in browser
2. Press F12 to open Developer Tools
3. Click on "Console" tab

### Step 2: Run the Script
1. Open the file `bulk-certificate-upload.js`
2. Copy the entire script content
3. Paste into browser console
4. Press Enter to execute

### Step 3: Monitor Execution
- Watch console for progress messages
- Script runs automatically once started
- Check for completion status

---

## 📋 Certificate Order Matching

**IMPORTANT**: Certificates are matched in exact CSV export order:

- `1.jpg` → First participant in CSV export
- `2.jpg` → Second participant in CSV export  
- `3.jpg` → Third participant in CSV export
- And so on...

**This order is based on Firebase document order, NOT registration date.**

---

## 🔍 Verification Steps

### After Upload Completion:

1. **Check Admin Interface**
   - Refresh the Certificate Manager page
   - Verify completion percentage
   - Check individual participant status

2. **Test Certificate URLs**
   - Click "View" buttons next to participants
   - Ensure certificates load properly
   - Verify correct certificate matches participant

3. **Firebase Verification**
   - Check Firebase console
   - Verify `certificateUrl` fields are populated
   - Confirm URLs are accessible

---

## ⚠️ Troubleshooting

### Common Issues:

**Files Not Found**
- Verify folder path is exactly: `/Users/sakshamgunj/Downloads/(Bulk 1) Add a heading (1) 2`
- Check file names are exactly: `1.jpg, 2.jpg, 3.jpg, etc.`
- Ensure all 49 files are present

**Upload Failures**
- Check internet connection
- Verify Cloudinary credentials
- Confirm Firebase permissions
- Try uploading in smaller batches

**Order Mismatch**
- Download CSV export first
- Verify certificate numbering matches CSV rows
- Re-run upload if order is incorrect

---

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all prerequisites are met
3. Try a different upload method
4. Contact technical support with specific error messages

---

## 🎯 Quick Start Commands

**For Terminal Users:**
```bash
# Navigate to project
cd /Users/sakshamgunj/Documents/indiancreativestar

# Run upload script (now ES modules compatible)
node certificate-uploader-node.js

# Or check status first
node certificate-uploader-node.js status
```

**For Web Users:**
1. Go to admin certificates page
2. Click "Upload Certificates"
3. Select all JPG files from the folder
4. Wait for completion

---

*Last updated: January 2024*