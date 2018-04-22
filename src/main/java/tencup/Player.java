package tencup;

/*
 * Represents a Player on a TenCup Team, which has a name and keeps track of number of cups made and shots taken.
 */
public class Player 
{
	private String myName;
	private int myCupsMade;
	private int myShotsTaken;
	private boolean myHasTakenShot;
	private int myCurrentStreak;
	private int myHighestStreak;
	
	public Player(String name)
	{
		myName = name;
		myCupsMade = 0;
		myShotsTaken = 0;
		myHasTakenShot = false;
		myCurrentStreak = 0;
		myHighestStreak = 0;
	}
	
	public boolean processMiss()
	{
		myShotsTaken++;
		myHasTakenShot = true;
		if (myCurrentStreak > 2)
		{
			myCurrentStreak = 0;
			return true;
		}
		else
		{
			myCurrentStreak = 0;
			return false;
		}
	}
	
	public void processMake(boolean countsTowardStreak)
	{
		myShotsTaken++;
		myCupsMade++;
		if (countsTowardStreak) myCurrentStreak++;
		myHasTakenShot = true;
		if (myCurrentStreak > myHighestStreak) myHighestStreak = myCurrentStreak;
	}
	
	public String getName()
	{
		return myName;
	}
	
	public String getStats()
	{
		String percentString = "";
		
		double percent = (double)myCupsMade/(double)myShotsTaken;
		percent = Math.round(percent*100);
		percentString = percent+"";
		percentString = percentString.substring(0, percentString.length()-2)+"%";
		
		return myCupsMade + " cups made, " + myShotsTaken + " shots taken - " + percentString + ". Highest Streak: " + myHighestStreak;
	}

	public boolean getHasTakenShot() {
		return myHasTakenShot;
	}
	
	public void setHasTakenShot(boolean hasTakenShot)
	{
		myHasTakenShot = hasTakenShot;
	}
	
	public int getCurrentStreak()
	{
		return myCurrentStreak;
	}
}