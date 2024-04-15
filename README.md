# Getting Started
first delete the existing package-lock.json file

## Step 1: Install Node Modules

To install node modules, run the following command from the _root_ of React Native project:

```bash
npm i
```

## Step 2: Install pods

run the following command from the _root_ of your React Native project:
```bash
npm run pods
```

## Step 3: Start Application

run metro

```bash
npm start
```

### For Android
>**Note**: for android run gradle synch before building
build application by **Android studio** for the first time

### For iOS

>**Note**: the application was tested on the IPhone 15 simulator. On simulator 11, there is a problem with displaying videos in FlatList. There is no such problem on a real device. Therefore, I recommend using simulator 15

build application by **XCode** or use command
```bash
npm run ios15
```


