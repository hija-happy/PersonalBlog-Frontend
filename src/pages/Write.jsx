import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WriteSection = ({ postId = null }) => {
  const [postData, setPostData] = useState({
    title: '',
    category: '',
    content: '',
    coverImage: null,
    tags: '',
    excerpt: '',
    status: 'published'
  });
  
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch post data if editing an existing post
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/blogs/${postId}`);
          const post = response.data.data;
          
          setPostData({
            ...post,
            // Convert array of tags back to comma-separated string for the form
            tags: post.tags ? post.tags.join(', ') : ''
          });
          
          // Set cover image preview if exists
          if (post.coverImage) {
            setCoverImagePreview(post.coverImage);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
          setErrorMessage('Failed to load post data');
        }
      };
      
      fetchPost();
    }
  }, [postId]);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Store the file for form submission
    setCoverImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  // Remove image
  const handleRemoveImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview(null);
    setPostData({
      ...postData,
      coverImage: null
    });
  };
  
  // Toggle between edit and preview modes
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };
  
  // Upload image to Cloudinary and handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');
    
    try {
      // Handle image upload to Cloudinary if there's a new image
      let cloudinaryImageUrl = postData.coverImage;
      
      if (coverImageFile) {
        setIsUploading(true);
        
        const formData = new FormData();
        formData.append('file', coverImageFile);
        formData.append('upload_preset', 'my_blog'); // Replace with your upload preset
        
        try {
          // Direct upload to Cloudinary
          const cloudinaryResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/dg48qihc5/image/upload`, // Replace with your cloud name
            formData
          );
          
          cloudinaryImageUrl = cloudinaryResponse.data.secure_url;
          setIsUploading(false);
        } catch (uploadError) {
          console.error('Cloudinary upload failed:', uploadError);
          setIsUploading(false);
          throw new Error('Failed to upload image to Cloudinary');
        }
      }
      
      // Prepare the post data with the Cloudinary image URL
      const postDataToSubmit = {
        ...postData,
        coverImage: cloudinaryImageUrl,
        tags: postData.tags ? postData.tags.split(',').map(tag => tag.trim()) : []
      };
      
      let response;
      
      if (postId) {
        response = await axios.put(`http://localhost:5000/api/blogs/${postId}`, postDataToSubmit);
      } else {
        response = await axios.post('http://localhost:5000/api/blogs', postDataToSubmit);
      }
      
      setSubmitStatus('success');
      
      // Reset form after success (only for new posts)
      if (!postId) {
        setTimeout(() => {
          setPostData({
            title: '',
            category: '',
            content: '',
            coverImage: null,
            tags: '',
            excerpt: '',
            status: 'published'
          });
          setCoverImageFile(null);
          setCoverImagePreview(null);
        }, 2000);
      }
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting post:', error);
      setSubmitStatus('error');
      setErrorMessage(error.response?.data?.message || 'Failed to save post');
    }
  };
  
  // Save as draft
  const saveDraft = async () => {
    setSubmitStatus('submitting');
    setErrorMessage('');
    
    try {
      // Upload image to Cloudinary if there's a new one
      let cloudinaryImageUrl = postData.coverImage;
      
      if (coverImageFile) {
        setIsUploading(true);
        
        const formData = new FormData();
        formData.append('image', coverImageFile);
        formData.append('upload_preset', 'my_blog'); // Replace with your upload preset
        
        try {
          // Direct upload to Cloudinary
          const cloudinaryResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/dg48qihc5/image/upload`, // Replace with your cloud name
            formData
          );
          
          cloudinaryImageUrl = cloudinaryResponse.data.secure_url;
          setIsUploading(false);
        } catch (uploadError) {
          console.error('Cloudinary upload failed:', uploadError);
          setIsUploading(false);
          throw new Error('Failed to upload image to Cloudinary');
        }
      }
      
      // Prepare the post data with the Cloudinary image info
      const postDataToSubmit = {
        ...postData,
        status: 'draft',
        coverImage: cloudinaryImageUrl,
        tags: postData.tags ? postData.tags.split(',').map(tag => tag.trim()) : []
      };
      
      let response;
      
      if (postId) {
        response = await axios.put(`/api/blogs/${postId}`, postDataToSubmit);
      } else {
        response = await axios.post('/api/blogs', postDataToSubmit);
      }
      
      setSubmitStatus('success');
      setErrorMessage('Draft saved successfully');
      
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error saving draft:', error);
      setSubmitStatus('error');
      setErrorMessage(error.response?.data?.message || 'Failed to save draft');
    }
  };
  
  // Available categories
  const categories = ['Technology', 'Design', 'Development', 'Lifestyle', 'Career', 'Personal'];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            {postId ? (previewMode ? 'Preview Your Post' : 'Edit Post') : (previewMode ? 'Preview Your Post' : 'Create New Post')}
          </h1>
          <p className="mt-2 text-gray-600">
            Share your thoughts, ideas, and expertise with the world
          </p>
        </div>
        
        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  {errorMessage || (postId ? 'Your post has been updated successfully!' : 'Your post has been published successfully!')}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {errorMessage || 'An error occurred. Please try again.'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Editor/Preview Toggle */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={togglePreview}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {previewMode ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Post
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Preview Post
              </>
            )}
          </button>
        </div>
        
        {previewMode ? (
          /* Preview Mode */
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Cover Image Preview */}
            {coverImagePreview ? (
              <div className="h-64 bg-gray-300 flex items-center justify-center overflow-hidden">
                <img src={coverImagePreview} alt="Cover" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-64 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-lg font-medium">No cover image selected</span>
              </div>
            )}
            
            {/* Content Preview */}
            <div className="p-8">
              <div className="mb-4">
                {postData.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
                    {postData.category}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {postData.title || 'Untitled Post'}
              </h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <img 
                  className="h-10 w-10 rounded-full bg-gray-300 mr-3" 
                  src="/api/placeholder/40/40" 
                  alt="Author" 
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Your Name</p>
                  <p>
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                {postData.content ? (
                  <div className="whitespace-pre-line">{postData.content}</div>
                ) : (
                  <p className="text-gray-400 italic">Your post content will appear here...</p>
                )}
              </div>
              
              {postData.tags && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {postData.tags.split(',').map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Card */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {/* Cover Image Section */}
              <div className="relative h-64 bg-gray-100 border-b flex items-center justify-center">
                {coverImagePreview ? (
                  <div className="w-full h-full relative">
                    <img src={coverImagePreview} alt="Cover preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <svg 
                      className="mx-auto h-12 w-12 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">Upload a cover image for your post</p>
                    <label
                      htmlFor="cover-image"
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
                    >
                      <span>Upload Image</span>
                      <input
                        id="cover-image"
                        name="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                )}
              </div>
              
              {/* Post Title and Category */}
              <div className="p-6">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={postData.title}
                  onChange={handleChange}
                  placeholder="Post Title"
                  className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-purple-600 focus:ring-0 text-3xl font-bold mb-4 py-3 px-4"
                />
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="w-full md:w-64">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={postData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="w-full md:flex-1">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      value={postData.tags}
                      onChange={handleChange}
                      placeholder="e.g. react, webdev, javascript"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                    Short Excerpt/Summary
                  </label>
                  <input
                    type="text"
                    name="excerpt"
                    id="excerpt"
                    value={postData.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary of your post (will appear in blog list)"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                
                {/* Post Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Post Content
                  </label>
                  <div className="mt-1 border border-gray-300 rounded-md">
                    {/* Simple toolbar */}
                    <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center p-1 rounded text-gray-700 hover:bg-gray-200"
                        title="Bold"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center p-1 rounded text-gray-700 hover:bg-gray-200"
                        title="Image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center p-1 rounded text-gray-700 hover:bg-gray-200"
                        title="Link"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </button>
                      <span className="border-r border-gray-300 h-6 mx-1"></span>
                      <button
                        type="button"
                        className="inline-flex items-center p-1 rounded text-gray-700 hover:bg-gray-200"
                        title="Quote"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center p-1 rounded text-gray-700 hover:bg-gray-200"
                        title="Code"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Content textarea */}
                    <textarea
                      id="content"
                      name="content"
                      rows={12}
                      value={postData.content}
                      onChange={handleChange}
                      placeholder="Write your post content here..."
                      className="block w-full border-0 focus:ring-0 p-4 text-base text-gray-900"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Tip: You can use Markdown syntax for formatting
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={saveDraft}
                disabled={submitStatus === 'submitting' || isUploading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={submitStatus === 'submitting' || isUploading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  (submitStatus === 'submitting' || isUploading) ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {submitStatus === 'submitting' || isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isUploading ? 'Uploading Image...' : (postId ? 'Updating...' : 'Publishing...')}
                  </>
                ) : (
                  postId ? 'Update Post' : 'Publish Post'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default WriteSection;