package tencup;

/*
 * Represents a single Cup in a Rack.
 */
public class Cup 
{
	private int myNumber;
	private int[] myNeighborArray;
	private boolean myMade;
	
	public Cup(int cupNumber, int[] cupNeighborArray)
	{
		myNumber = cupNumber;
		myNeighborArray = cupNeighborArray;
		myMade = false;
	}
	
	public int getCupNumber()
	{
		return myNumber;
	}
	
	public int[] getNeighborArray()
	{
		return myNeighborArray;
	}
	
	public boolean getMade()
	{
		return myMade;
	}
	
	public void setMade(boolean made)
	{
		myMade = made;
	}
}