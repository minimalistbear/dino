# DINO is not Outlook: Democratic Independent Nameless Organizer

## Setup

### For Local Usage Only

- install [Ganache](https://www.trufflesuite.com/ganache) (for a local blockchain with some predefined accounts)
- install [Remix](https://github.com/ethereum/remix-ide) (for developing and deployment of our Project)

```console
   npm install -g remix-ide
```
- clone our git repository

```console
   git clone https://github.com/minimalistbear/dino.git
```

### In General
- install [Metamask](https://metamask.io/) (as plugin in your browser to connect our project with a running blockchain)
- follow the steps shown by Metamask when you open it the first time to create a Metamask account
- go to the preferences of Metamask and disable "Privacy mode" in the section "Security & Privacy"

## Build

### Local
#### Build Underlaying Structure
- start Ganache and use the Quickstart button to create a local blockchain with some accounts
- connect Metamask with your local blockchain therefore:
 - create a new network in your Metamask plugin settings which has the RPC URL "localhost:7545" (default address for Ganache) and switch to it with Metamask
 - now switch to Ganache choose an arbitrary account and copy its private key (key symbol on the right side on the accounts list)
 - switch back to Metamask and import an account using the copied private key
- start remix-ide in the cloned folder
- open [localhost:8080](localhost:8080) in your browser (default address for Remix)
 - connect Remix to your local directory (symbol which looks like a chain link)
 - go to localhost menu (which should be appeared on the left side of the page)
 - there choose localhost/app/democraticCalendar/democraticCalendar.sol and localhost/app/ethereum-datetime/DateTime.sol
 - both of these files should now be shown in the middle of the page

#### Build Contracts
- choose DateTime.sol and compile (right page side) it with compiler version "0.5.9 commit"
- switch to run tab and choose Web3 Provider therefore choose "http://localhost:7545" (Ganache) as provider endpoint
- deploy DateTime.sol
- open the newest block (should be block 1) in Ganache, click on the contract and copy created contract address
- in remix open democraticCalendar.sol and replace the current dateTimeAddr in line 24 with the copied one
- compile democraticCalendar.sol and deploy it (maybe you have to select it in the drop down menu above the deploy button)
- copy the address by using the little copy symbol right of DemocraticCalendar in the "Deployed Contracts" section
- in the file [funcCommon.js](./app/frontend/funcCommon.js) replace the current calendarAddress in line 4 with the copied one
- switch with your console into the [frontend-folder](./app/frontend/) and create a server hosting our project for example with

```console
   python -m SimpleHTTPServer 8000
```
- open [localhost:8000](localhost:8000) in your browser

### Remote (Only Usermode)
- choose rinkeby test network in Metamask
- chose an account with some Ether>0 (eg. get some with [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/))
- open in your browser [http://tinyurl.com/blockchaindino](http://tinyurl.com/blockchaindino)

## Usage

As user you can create appointments using your personal data. For more comfort we added a possibility to show the free time slots on the chosen day.

As admin (you can switch those rolls using the button in the right upper side) you are able to delete appointments and to verify the data of a person (in the best case before deleting an appointment).

## Notes
1.  Install Ganache
    ```https://truffleframework.com/docs/ganache/quickstart```
2.  Install Truffle
    ```npm install -g truffle```
3.  Install Remix
    ```npm install -g remix-ide```
4.  Open Ganache & Quickstart:
    a local instance of a blockchain will now be reachable at http://localhost:7545
5.  Create a folder and within create an empty text file called asparagusSurvey.sol
6.  Navigate to this folder with the Terminal
7.  Start Remix within the folder & visit it
    ```remix-ide
    http://localhost:8080```
8.  Link the folder to to Remix:
    sixth button from the top left
9.  Open asparagusSurvey.sol with Remix and paste code from the tutorial
    one can find the file in the left-hand panel
10. Compile with most current commit-compiler
11. Swith to Run tab & select as Environment the "Web3 Provider":
    enter address of Ganache blockchain: http://localhost:7545
12. Deploy
13. Build awesome shit with my best mate.