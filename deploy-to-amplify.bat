echo Deploying to AWS Amplify...
@echo off

echo 1. Initialize git repository
git init
git add .
git commit -m "Initial portfolio deployment"

echo 2. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify/
echo 3. Click "New app" > "Host web app"
echo 4. Connect your GitHub repository
echo 5. Amplify will auto-detect React settings
echo 6. Deploy!

echo Your portfolio will be live at: https://BRANCH-NAME.RANDOM-ID.amplifyapp.com

pause