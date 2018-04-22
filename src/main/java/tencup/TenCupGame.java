package tencup;

import java.awt.Color;
import java.awt.FlowLayout;
import java.util.ArrayList;
import java.util.HashMap;

import javax.swing.BoxLayout;
import javax.swing.JFrame;
import javax.swing.JPanel;

import tencup.panels.ControlsPanel;
import tencup.panels.CupsPanel;
import tencup.panels.OutputPanel;
import tencup.panels.StatusPanel;

/*
 * v1.1
 * A game of TenCup, which is comprised of 2 teams playing against each other.
 */
@SuppressWarnings("serial")
public class TenCupGame extends JFrame {
	private Team myTeam1;
	private Team myTeam2;
	private Team myTeamUp;

	private HashMap<Team, CupsPanel> myTeamCupsPanels;
	private StatusPanel myStatusPanel;
	private ControlsPanel myControlsPanel;
	private OutputPanel myOutputPanel;

	private boolean myRoundOver;
	private boolean myIslandMode;

	public static void main(String[] args) {
		new TenCupGame();
	}

	public TenCupGame() {
		getContentPane().setLayout(new BoxLayout(getContentPane(), BoxLayout.PAGE_AXIS));

		myTeam1 = new Team(new Player("John"), new Player("Zack"), new Rack(10, true), "Alpha", Color.BLUE);
		myTeam2 = new Team(new Player("Matt"), new Player("Aimee"), new Rack(10, false), "Beta", Color.BLACK);
		myTeamUp = myTeam1;

		myTeamCupsPanels = new HashMap<Team, CupsPanel>();

		myRoundOver = false;
		myIslandMode = false;

		initializePanels();
		addAndOrganizePanels();

		setTitle("TenCup");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setVisible(true);
	}

	private void initializePanels() {
		myTeamCupsPanels.put(myTeam1, new CupsPanel(this, myTeam1.getRack(), myTeam1.getColor()));
		myTeamCupsPanels.put(myTeam2, new CupsPanel(this, myTeam2.getRack(), myTeam2.getColor()));
		myTeamCupsPanels.get(myTeam1).setAllCupsEnabled(true);
		myTeamCupsPanels.get(myTeam2).setAllCupsEnabled(false);

		myStatusPanel = new StatusPanel();
		myControlsPanel = new ControlsPanel(this);
		myOutputPanel = new OutputPanel();

		myStatusPanel.incrementRound();
		myStatusPanel.updateTeamAndPlayer(myTeamUp);
	}

	private void addAndOrganizePanels() {
		this.getContentPane().removeAll();

		JPanel[] subpanelArray = new JPanel[2];
		subpanelArray[0] = myTeamCupsPanels.get(myTeam1);
		subpanelArray[1] = myTeamCupsPanels.get(myTeam2);
		add(createContainerPanel(subpanelArray, 300));
		subpanelArray[0] = myStatusPanel;
		subpanelArray[1] = myControlsPanel;
		add(createContainerPanel(subpanelArray, 100));
		subpanelArray[0] = myOutputPanel;
		subpanelArray[1] = null;
		add(createContainerPanel(subpanelArray, 400));

		pack();
		setSize(800, 800);
		repaint();
	}

	private JPanel createContainerPanel(JPanel[] subpanelArray, int height) {
		JPanel containerPanel = new JPanel();
		containerPanel.setLayout(new FlowLayout());

		for (int i = 0; i < subpanelArray.length; i++) {
			if (subpanelArray[i] != null)
				containerPanel.add(subpanelArray[i]);
		}
		containerPanel.setSize(1200, height);
		return containerPanel;
	}

	public void redrawTeamCupsPanel(Team teamToRedraw) {
		myTeamCupsPanels.put(teamToRedraw, new CupsPanel(this, teamToRedraw.getRack(), teamToRedraw.getColor()));
		addAndOrganizePanels();
	}

	/*
	 * Update game on button clicks.
	 */
	public void updateGame() {
		if (myTeamUp.hasWon()) {
			myOutputPanel.outputText("Team " + myTeamUp.getName() + " has won.\n");
			myOutputPanel.outputText("Team " + myTeam1.getName() + ":");
			myOutputPanel.outputText(myTeam1.getStats() + "\n");
			myOutputPanel.outputText("Team " + myTeam2.getName() + ":");
			myOutputPanel.outputText(myTeam2.getStats());
		} else {
			if (myRoundOver) {
				if (myTeamUp.getMissedACup()) {
					switchSides();
				} else {
					myOutputPanel.outputText("Bringbacks!");
					myTeamUp.setCanSwitchShooters(true);
				}
				myTeamUp.resetShots();
			}
			myControlsPanel.getMadeIslandButton().setEnabled(!myTeamUp.getRack().getIslands().isEmpty());
			myControlsPanel.getRerackButton().setEnabled(myTeamUp.canRerack());
			myControlsPanel.getSwitchShooterButton().setEnabled(myTeamUp.getCanSwitchShooters());
		}
		myRoundOver = false;
		myStatusPanel.updateTeamAndPlayer(myTeamUp);
	}

	/*
	 * Switches sides at the end of a round.
	 */
	private void switchSides() {
		myTeamUp.setMissedACup(false);
		myTeamUp.setHasStartedRound(false);
		myTeamUp.setCanSwitchShooters(true);
		myTeamCupsPanels.get(myTeamUp).setAllCupsEnabled(false);
		changeTeamUp();
		if (myTeamUp == myTeam1)
			myStatusPanel.incrementRound();
		myTeamCupsPanels.get(myTeamUp).setAllCupsEnabled(true);
		myOutputPanel.clearText();
	}

	/*
	 * Changes the shooting team.
	 */
	private void changeTeamUp() {
		if (myTeamUp == myTeam1) {
			myTeamUp = myTeam2;
		} else {
			myTeamUp = myTeam1;
		}
	}

	public void setRoundOver(boolean roundOver) {
		myRoundOver = roundOver;
	}

	public void enableMissButton() {
		myControlsPanel.getMissButton().setEnabled(true);
	}

	public void clearOutput() {
		myOutputPanel.clearText();
	}

	public Team getTeamUp() {
		return myTeamUp;
	}

	public boolean getIslandMode() {
		return myIslandMode;
	}

	public void setIslandMode(boolean islandMode) {
		myIslandMode = islandMode;
		myControlsPanel.setAllControlsEnabled(!myIslandMode);
		if (islandMode) {
			myOutputPanel.outputText("Click island that was made.");
			ArrayList<Cup> islandsList = myTeamUp.getRack().getIslands();
			myTeamCupsPanels.get(myTeamUp).enableIslands(islandsList);
		} else {
			myOutputPanel.outputText("Click extra cup to remove.");
			myControlsPanel.getMissButton().setEnabled(false);
			myTeamCupsPanels.get(myTeamUp).setAllCupsEnabled(true);
		}
	}
}