# TechCorp Frontend Enhancement Assessment 2024

## Overview
This repository contains the assessment materials for the TechCorp Frontend Enhancement challenge. You are given a React component that displays a simple user profile, and your task is to enhance this component by adding new features and improving the user experience.

## Problem Statement
You are given a React component (`UserProfile`) that displays basic user information. Your task is to enhance this component by implementing the requirements listed below.

## Assessment Requirements

### ✅ Required Features:
- [ ] **Edit Profile Button**: Add a button that opens a modal for editing user information
- [ ] **Form Validation**: Implement proper form validation for the edit profile form
- [ ] **Save Changes Functionality**: Add save functionality with loading states and success messages
- [ ] **Mobile Responsiveness**: Improve the responsive design for mobile devices
- [ ] **Error Handling**: Add proper error handling for failed operations
- [ ] **Theme Toggle**: Implement a dark/light theme toggle

### 🎯 Bonus Features (Optional):
- [ ] **Image Upload**: Allow users to upload and change profile pictures
- [ ] **Real-time Validation**: Show validation errors as user types
- [ ] **Keyboard Navigation**: Ensure the component is fully accessible via keyboard
- [ ] **Animation**: Add smooth transitions and animations

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Anucampa28/techcorp-frontend-enhancement-2024.git
   cd techcorp-frontend-enhancement-2024
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Current Component Structure

The `UserProfile` component is located in `src/components/UserProfile.jsx` and currently displays:
- User role
- Bio description
- Email address
- Location

## Assessment Guidelines

### Time Limit
- **Total Time**: 60 minutes
- **Planning**: 10 minutes (read requirements, plan approach)
- **Implementation**: 45 minutes (code the features)
- **Testing**: 5 minutes (verify functionality)

### Code Quality Expectations
- **Clean Code**: Write readable, well-structured code
- **Component Design**: Use proper React patterns and hooks
- **Styling**: Implement responsive design with CSS
- **Error Handling**: Graceful error handling and user feedback
- **Accessibility**: Ensure the component is accessible

### Submission Requirements
1. **Working Application**: All required features must be functional
2. **Code Quality**: Clean, well-commented code
3. **Responsive Design**: Works on desktop and mobile
4. **Error Handling**: Proper error states and user feedback
5. **Documentation**: Clear comments explaining your approach

## Evaluation Criteria

| Criteria | Weight | Description |
|----------|--------|-------------|
| **Functionality** | 40% | All required features working correctly |
| **Code Quality** | 25% | Clean, readable, well-structured code |
| **User Experience** | 20% | Intuitive interface and smooth interactions |
| **Responsive Design** | 10% | Works well on different screen sizes |
| **Error Handling** | 5% | Graceful error states and user feedback |

## Getting Help

### Allowed Resources
- ✅ React documentation and tutorials
- ✅ CSS/HTML references
- ✅ Stack Overflow and similar Q&A sites
- ✅ Your own code snippets and libraries
- ✅ Browser developer tools

### Not Allowed
- ❌ Copying complete solutions from others
- ❌ Using AI tools to generate the entire solution
- ❌ Getting help from other people during the assessment

## Technical Notes

### Dependencies Available
- React 18.2.0
- React DOM 18.2.0
- React Scripts 5.0.1

### File Structure
```
src/
├── components/
│   └── UserProfile.jsx    # Component to enhance
├── App.js                 # Main application
├── App.css                # Application styles
└── index.js               # Entry point
```

### Styling
- Use CSS classes or styled-components
- Ensure responsive design (mobile-first approach)
- Follow modern design principles

## Submission

### What to Submit
1. **Working Code**: All files in your repository
2. **README Updates**: Document any additional setup steps
3. **Screenshots**: Show the enhanced component in action

### How to Submit
1. Commit all your changes to the repository
2. Push to the main branch
3. Ensure the application runs without errors
4. Document any additional features you implemented

## Contact

For questions about this assessment:
- **Email**: assessment@techcorp.com
- **Support**: Available during assessment hours
- **Technical Issues**: Check the troubleshooting section below

## Troubleshooting

### Common Issues
- **Port 3000 in use**: Try `npm start -- --port 3001`
- **Dependencies not installing**: Clear npm cache with `npm cache clean --force`
- **Build errors**: Check console for specific error messages

### Performance Tips
- Use React.memo for expensive components
- Implement proper loading states
- Optimize re-renders with useCallback/useMemo

---

**Good luck with your assessment! 🚀**

Remember: Focus on implementing the core requirements first, then add bonus features if time permits.
