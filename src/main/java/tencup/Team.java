package tencup;

import java.awt.Color;

/*
 * A TenCup Team, which has a Team Name, is comprised of 2 players, and has a rack to shoot at.
 */
public class Team 
{
	private String myName;
	private Color myColor;
	
	private Player myPlayer1;
	private Player myPlayer2;
	private Player myShooter;
	
	private boolean myMissedACup;
	private int myReracksRemaining;
	private boolean myHasStartedRound;
	private boolean myCanSwitchShooters;
	
	private Rack myRack;
		
	public Team(Player player1, Player player2, Rack rack, String teamName, Color teamColor)
	{
		myName = teamName;
		myColor = teamColor;
		myPlayer1 = player1;
		myPlayer2 = player2;
		myShooter = myPlayer1;
		myRack = rack;
		myMissedACup = false;
		myReracksRemaining = 2;
		myHasStartedRound = false;
		myCanSwitchShooters = true;
	}
	
	/*
	 * Processes a made shot by the team.
	 */
	public void processMake(String cupMade, boolean countsTowardStreak)
	{
		myShooter.processMake(countsTowardStreak);
		Integer cupMadeInteger = new Integer(cupMade);
		myRack.sinkCup(cupMadeInteger.intValue());
		myHasStartedRound = true;
		myCanSwitchShooters = false;
	}
	
	/*
	 * Processes a missed shot by the team.
	 */
	public void processMiss()
	{
		boolean shooterLostFire = myShooter.processMiss();
		myMissedACup = myMissedACup || !shooterLostFire;
		myHasStartedRound = true;
		myCanSwitchShooters = false;
	}
	
	/*
	 * Return whether this team has made all its cups.
	 */
	public boolean hasWon()
	{
		return myRack.getNumCups() == 0;
	}
	
	/*
	 * Returns the statistics of the team.
	 */
	public String getStats()
	{
		return (myPlayer1.getName() + ": " + myPlayer1.getStats() + "\n" 
				+ myPlayer2.getName() + ": " + myPlayer2.getStats());
	}
	
	/*
	 * Switches shooter.
	 */
	public void switchShooter() 
	{
		if (myShooter == myPlayer1) myShooter = myPlayer2;
		else myShooter = myPlayer1;
	}

	/*
	 * Uses one of the team's reracks.
	 */
	public void useRerack() 
	{
		myReracksRemaining--;
		this.myRack = new Rack(this.myRack.getNumCups(), this.myRack.getRightFacing());
	}

	/*
	 * Returns whether this team can rerack.
	 */
	public boolean canRerack() 
	{
		return myRack.isRerackable() && myReracksRemaining > 0 && !myHasStartedRound;
	}
	
	public void resetShots()
	{
		myPlayer1.setHasTakenShot(false);
		myPlayer2.setHasTakenShot(false);
	}

	public String getName()
	{
		return myName;
	}
	
	public Color getColor()
	{
		return myColor;
	}
	
	public Rack getRack()
	{
		return myRack;
	}
	
	public Player getPlayer1()
	{
		return myPlayer1;
	}
	
	public Player getPlayer2()
	{
		return myPlayer2;
	}
	
	public Player getPlayerUp() 
	{
		return myShooter;
	}
	
	public void setPlayerUp(Player playerUp) 
	{
		myShooter = playerUp;
	}
	
	public boolean getMissedACup() 
	{
		return myMissedACup;
	}
	
	public void setMissedACup(boolean missedACup)
	{
		myMissedACup = missedACup;
	}
	
	public boolean getHasStartedRound()
	{
		return myHasStartedRound;
	}
	
	public void setHasStartedRound(boolean hasStartedRound) 
	{
		myHasStartedRound = hasStartedRound;
	}
	
	public boolean getCanSwitchShooters()
	{
		return myCanSwitchShooters;
	}
	
	public void setCanSwitchShooters(boolean canSwitchShooters)
	{
		myCanSwitchShooters = canSwitchShooters;
	}

	public boolean turnIsOver() {
		return myPlayer1.getHasTakenShot() && myPlayer2.getHasTakenShot();
	}
}