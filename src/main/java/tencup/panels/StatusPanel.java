package tencup.panels;

import java.awt.Color;
import java.awt.Dimension;

import javax.swing.BoxLayout;
import javax.swing.JLabel;
import javax.swing.JPanel;

import tencup.Team;

/*
 * Panel that contains game state labels.
 */
@SuppressWarnings("serial")
public class StatusPanel extends JPanel {
	private JLabel roundLabel;
	private JLabel teamUpLabel;
	private JLabel playerUpLabel;
	
	private int roundNumber;
	
	public StatusPanel()
	{		
		setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
		setPreferredSize(new Dimension(200,50));
		initializeLabels();

		add(roundLabel);
		add(teamUpLabel);
		add(playerUpLabel);
		
		roundNumber = 0;
	}
	
	private void initializeLabels()
	{
		roundLabel = initializeStatusLabel();
		teamUpLabel = initializeStatusLabel();
		playerUpLabel = initializeStatusLabel();
	}
	
	private JLabel initializeStatusLabel()
	{
		JLabel statusLabel = new JLabel();
		statusLabel.setHorizontalAlignment(0);
		statusLabel.setBackground(Color.WHITE);
		statusLabel.setOpaque(true);
		return statusLabel;
	}

	public void incrementRound() 
	{
		roundLabel.setText("Round " + ++roundNumber);
	}
	
	public void updateTeamAndPlayer(Team teamUp) 
	{
		teamUpLabel.setText("Team " + teamUp.getName());
		teamUpLabel.setForeground(teamUp.getColor());
		int playerStreak = teamUp.getPlayerUp().getCurrentStreak();
		if (playerStreak == 2)
		{
			playerUpLabel.setBackground(Color.ORANGE);
			playerUpLabel.setText("Shooter: " + teamUp.getPlayerUp().getName() + " (Heating Up)");
		}
		else if (playerStreak > 2)
		{
			playerUpLabel.setBackground(Color.RED);
			playerUpLabel.setText("Shooter: " + teamUp.getPlayerUp().getName() + " (ON FIRE)");
		}
		else
		{
			playerUpLabel.setBackground(Color.WHITE);
			playerUpLabel.setText("Shooter: " + teamUp.getPlayerUp().getName());
		}
	}
}
