package tencup;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

/*
 * Represents a TenCup Rack, which is a list of Cups.
 */
public class Rack 
{
	private int mySize;
	private ArrayList<Cup> myCupList;
	private boolean myRightFacing;
	
	public Rack(int size, boolean rightFacing)
	{
		mySize = size;
		myCupList = new ArrayList<Cup>();
		myCupList.clear();
		myRightFacing = rightFacing;
		initializeCups();
	}
	
	private void initializeCups() 
	{
		BufferedReader br = null;
		try 
		{
			br = new BufferedReader(new FileReader(TenCupUtils.MAC_NEIGHBORS_FILE_LOC));
			myCupList = TenCupUtils.generateCupList(mySize, br);
		} 
		catch (IOException e) 
		{
			e.printStackTrace();
		} 
		finally 
		{
			try 
			{
				if (br != null) br.close();
			} 
			catch (IOException e) 
			{
				e.printStackTrace();
			}
		}

	}

	/*
	 * Returns the number of cups still in the rack.
	 */
	public int getNumCups()
	{
		int returnVal = 0;
		for (Cup c: myCupList)
		{
			if (!c.getMade()) returnVal++;
		}
		return returnVal;
	}
	
	/*
	 * Removes cup from table (cupNumber is a number 1-10).
	 */
	public void sinkCup(int cupNumber)
	{
		myCupList.get(cupNumber-1).setMade(true);
	}
	
	public ArrayList<Cup> getIslands()
	{
		ArrayList<Cup> islandsList = new ArrayList<Cup>();
		if (mySize < 10 || getNumCups() < 5) return islandsList; //Return empty list
		for (Cup c: myCupList)
		{
			boolean tempIsland = true;
			if (c.getMade() || c.getNeighborArray()==null) tempIsland = false;
			else
			{
				for (int i = 0; i < c.getNeighborArray().length; i++)
				{
					if (!myCupList.get(c.getNeighborArray()[i]-1).getMade()) tempIsland = false; 
				}
			}
			if (tempIsland) islandsList.add(c);
		}
		return islandsList;
	}

	public int getSize() 
	{
		return mySize;
	}

	public boolean getRightFacing()
	{
		return myRightFacing;
	}
	
	public boolean isRerackable() 
	{
		int numCups = getNumCups();
		if (numCups == mySize) return false;
		return numCups==6
				|| numCups==4
				|| numCups==3
				|| numCups==2
				|| numCups==1;
	}

}