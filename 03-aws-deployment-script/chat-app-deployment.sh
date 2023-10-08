#!bin/bash


EC2_USER=ec2-user
REPO_NAME=uptick-talent-fellowship
REPO_URL=git@github.com:abuhanaan/$REPO_NAME.git
APP_FOLDER_NAME=02-chat-app
APP_NAME=chat-app



echo -e "\n################\n Initializing Node Installation\n################\n"

if type -p node &>/dev/null; then
    echo -e "\n Node is already installed.\n"
    # Checking node version
    node -e "console.log('Running Node.js ' + process.version)"
else

echo -e "\n################\n Installing NVM\n################\n"
# Install Node 16 with nvm
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# Activate nvm
. ~/.nvm/nvm.sh

echo -e "\n################\n NVM installation Completed\n################\n"


echo -e "\n################\n Installing Node with NVM\n################\n"
# Installing Node16 with nvm
nvm install node@16
echo -e "\n################\n Node Installation Completed!!!\n################\n"

# confirm that node installe successfully and Checking node version
node -e "console.log('Running Node.js ' + process.version)"

fi


if type -p npm &>/dev/null; then
    echo -e "\n NPM is already installed.\n"
    # Checking npm version
    npm -v
    echo -e "\n################\n NPM Already In Place\n################\n"
else
    echo -e "\n NPM is not installed.\n"

    echo -e "\n################\n Initialising NPM Installation\n################\n"
    sudo apt install npm

    echo -e "\n################\n NPM Installation Completed\n################\n"
    
fi


echo -e "\n################\n Initializing Git Installation \n################\n"
# Install git
sudo apt install git -y
echo -e "\n################\n Git Installation Completed \n################\n"



if [ -d "/$EC2_USER/$REPO_NAME" ]; then
    # Folder exists, so delete it (empty or not)
    sudo rm -rf  "/$EC2_USER/$REPO_NAME"
    echo -e "$REPO_NAME Folder deleted."
else
    echo -e "$REPO_NAME Folder does not exist before."
fi


echo -e "\n################\n Cloning The Project Repository \n################\n"
# Clone the project from bitbucket
git clone $REPO_URL
echo -e "\n################\n Repository Cloning Completed \n################\n"



echo -e "\n################\n Initializing PM2 Installation\n################\n"
sudo npm install pm2@latest -g
echo -e "\n################\n PM2 Installation Completed\n################\n"


# Navigate Into The Chat App Directory
cd /$EC2_USER/$REPO_NAME/$APP_FOLDER_NAME

echo -e "\n################\n Running The Chat App With PM2\n################\n"
# Running the app in the background with pm2
sudo pm2 start src/index.js


echo -e "\n################\n Getting The Application And Its Managed Processes To Launch on System Startup\n################\n"
pm2 startup systemd
# Setting Up The Startup Script
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $APP_NAME --hp /home/$APP_NAME
# Save The Process List And Corresponding Environments
pm2 save
# Start the service
sudo systemctl start pm2-$APP_NAME


echo -e "\n################\n REBOOTING THE SERVER\n################\n"
sudo reboot


